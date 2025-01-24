import React, { useContext } from "react";
import { Navbar as NavbarBs, Button, Modal } from "react-bootstrap";
import productContext from "../../Context/productsContext";

// components
import CartProduct from "../CartProduct/CartProduct";

// icons
import { BsCart } from "react-icons/bs";

export default function Navbar() {
  const contextData = useContext(productContext);
  const productsCount = contextData.cartProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalAmount = contextData.getTotalAmount();

  async function payHandler() {
    await fetch(`http://localhost:4000/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: contextData.cartProducts,
      }),
    });

    contextData.setCartProducts([]);
    contextData.showCartHandler();
    alert(`سفارش شما ثبت شد`);
  }

  return (
    <>
      <NavbarBs className="border-bottom border-secondary">
        <NavbarBs.Collapse className="justify-content-end">
          <Button
            variant="btn btn-outline-secondary"
            className="text-white"
            onClick={contextData.showCartHandler}
          >
            ({productsCount})<BsCart className="mx-2"></BsCart>سبد خرید
          </Button>
        </NavbarBs.Collapse>
      </NavbarBs>

      <Modal
        show={contextData.showCart}
        onHide={contextData.showCartHandler}
        contentClassName="card-bg"
        dir="rtl"
      >
        <Modal.Header>
          <Modal.Body>
            {productsCount > 0 ? (
              <>
                <h4 className="mb-5" align="center">
                  سبدخرید
                </h4>
                {contextData.cartProducts.map((item) => (
                  <CartProduct {...item} key={item.id}></CartProduct>
                ))}
                <h5>قیمت کل: {totalAmount.toLocaleString()} تومان</h5>
                <Button
                  className="mt-5"
                  variant="btn btn-light"
                  style={{ width: "100%" }}
                  onClick={() => payHandler()}
                >
                  پرداخت
                </Button>
              </>
            ) : (
              <>
                <h4 align="center">سبدخرید خالی است</h4>
              </>
            )}
            <Button
              className="mt-3"
              variant="btn btn-outline-light"
              style={{ width: "100%" }}
              onClick={() => contextData.showCartHandler()}
            >
              بستن
            </Button>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
}
