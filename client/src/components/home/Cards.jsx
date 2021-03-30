import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import  {Switch,BrowserRouter, Route}  from "react-router-dom";

function Cards(props) {
  return (
    <Card
      className="text-center"
      style={{
        width: "18rem",
        float: "left",
        margin: " 20px",
        position: "35px"
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
                window.location.assign("https://boiling-shore-86650.herokuapp.com/"+props.variab+"/google");
                history.push(props.route);
              }}
            >
              Login for Free
            </Button>
          )}
        />
      </Card.Body>
    </Card>
  );
}

export default Cards;
