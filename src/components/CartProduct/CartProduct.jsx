import React, { useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";
import productContext from "../../Context/productsContext";

export default function CartProduct({ title, quantity }) {
  const contextData = useContext(productContext);
  const productData = contextData.getProductData(title);
  const productTotalPrice = quantity * productData.price;

  return (
    <>
      <Row className="my-5">
        <Col>
          <img
            src={productData.img}
            alt="img"
            style={{ height: "70px", width: "70px", backgroundColor: "#fff" }}
          />
        </Col>
        <Col>
          <p>{productData.title}</p>
          <p>تعداد: {quantity}</p>
          <p>قیمت : {productTotalPrice.toLocaleString()} تومان</p>
        </Col>
        <Col>
          <Button
            size="sm"
            className="mb-5 text-white"
            variant="btn btn-outline-secondary"
            onClick={() => contextData.deleteFromCart(title)}
          >
            حذف از سبدخرید
          </Button>
        </Col>
      </Row>
    </>
  );
}
