import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import  {Switch,BrowserRouter, Route}  from "react-router-dom";
import Col from "react-bootstrap/Col";

function Cards(props) {
  return (
    <Col lg={3} md={6} xs={12}>
      <Card
        className="text-center"
        style={{
          margin: "20px 0px 0px 0px"
        }}
      >
        <Card.Header>
          <Card.Title>{props.Title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Img
            variant="top"
            style={{ height: "75px", width: "75px" }}
            src={props.img}
          />
          <Card.Text>{props.Text}</Card.Text>

          <Route
            render={({ history }) => (
              <Button
                variant="outline-dark"
                onClick={() => {
                  window.location.assign("http://localhost:5000/"+props.variab+"/google");
                  history.push(props.route);
                }}
              >
                Login for Free
              </Button>
            )}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;
