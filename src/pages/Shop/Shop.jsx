import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import productContext from "../../Context/productsContext";

// components
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Shop() {
  const contextData = useContext(productContext);

  return (
    <>
      <Row xs={1} md={4} className="g-4 mt-2">
        {contextData.allProducts.map((product) => (
          <Col align="center" key={product.id}>
            <ProductCard {...product}></ProductCard>
          </Col>
        ))}
      </Row>
    </>
  );
}
