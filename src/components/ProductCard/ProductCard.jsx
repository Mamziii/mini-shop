import React, { useContext } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import productContext from "../../Context/productsContext";

export default function ProductCard({ id, title, price, img }) {
  const contextData = useContext(productContext);
  const productQuantity = contextData.getProductQuantity(title);

  return (
    <>
      <Card className="mt-1 card-bg">
        <Card.Body>
          <Card.Img
            variant="top"
            src={img}
            height="200px"
            style={{ objectFit: "cover" }}
          />
          <Card.Title className="pt-4 text-light" align="right">
            {title}
          </Card.Title>
          <Card.Text className="text-light" align="right">
            قیمت : {price.toLocaleString()} تومان
          </Card.Text>
          {productQuantity > 0 ? (
            <>
              <Form as={Row}>
                <Form.Label column="true" sm="6" className="text-white">
                  تعداد: {productQuantity}
                </Form.Label>
                <Col>
                  <Button
                    sm="6"
                    className="mx-2 text-white"
                    variant="btn btn-outline-secondary"
                    onClick={() => contextData.addItemToCart(title)}
                  >
                    +
                  </Button>
                  <Button
                    sm="6"
                    className="mx-2 text-white"
                    variant="btn btn-outline-secondary"
                    onClick={() => contextData.removeItemFromCart(title)}
                  >
                    -
                  </Button>
                </Col>
              </Form>

              <Button
                className="mt-4"
                variant="btn btn-light"
                onClick={() => contextData.deleteFromCart(title)}
              >
                حذف از سبدخرید
              </Button>
            </>
          ) : (
            <Button
              variant="btn btn-outline-secondary"
              className="text-white"
              onClick={() => {
                contextData.addItemToCart(title);
              }}
            >
              افزودن به سبدخرید
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
