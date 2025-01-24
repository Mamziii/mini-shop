import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Container } from "react-bootstrap";
import routes from "./router";
import productContext from "./Context/productsContext";

// components
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const router = useRoutes(routes);

  // get and show products & foods funcs
  function getAllProducts() {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  // show cart funcs
  const showCartHandler = () => {
    setShowCart((showCart) => !showCart);
  };

  // quantity func
  function getProductQuantity(title) {
    const quantity = cartProducts.find(
      (item) => item.title === title
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  // add to cart func
  function addItemToCart(title) {
    const quantity = getProductQuantity(title);

    if (quantity === 0) {
      setCartProducts([...cartProducts, { title: title, quantity: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }

  // delete from cart func
  function deleteFromCart(title) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((item) => {
        return item.title != title;
      })
    );
  }

  // removeFrom cart func
  function removeItemFromCart(title) {
    const quantity = getProductQuantity(title);

    if (quantity === 1) {
      deleteFromCart(title);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  // get product data
  function getProductData(title) {
    let productData = allProducts.find((item) => item.title === title);
    return productData;
  }

  // total product amount
  function getTotalAmount() {
    let totalAmount = 0;

    cartProducts.map((item) => {
      let productData = getProductData(item.title);

      totalAmount += productData.price * item.quantity;
    });
    return totalAmount;
  }

  return (
    <>
      <productContext.Provider
        value={{
          allProducts,
          showCart,
          cartProducts,
          setCartProducts,
          showCartHandler,
          getProductQuantity,
          addItemToCart,
          deleteFromCart,
          removeItemFromCart,
          getProductData,
          getTotalAmount,
        }}
      >
        <Container>
          <Navbar />
          {router}
        </Container>
      </productContext.Provider>
    </>
  );
}
