import React from "react";
import Cards from "./Cards";
import food from "./images/food.png";
import theatre from "./images/theater.png";
import camera from "./images/video-camera.png";
import customer from "./images/customer.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';
import  {Switch,BrowserRouter, Route}  from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <Container>
      <div className="Container">
        <Row>
          <h2 style={{ textAlign: "center", margin: "50px 100px 0px" }}>
            ONE SINGLE PLATFORM FOR VARIOUS IN-PERSON EVENTS !!
          </h2>
        </Row>

        <Row>
          <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
            Hosting a special event? It's never been easier. Plan your next party in
            style and streamline the planning process with our online party planner.
          </div>
      </Row>     
      
        <Row>
          <Cards
            img={customer}
            Title="Customer"
            Text="Quickly organize a professional-looking event."
            route="/customer/google"
            variab="customer"
          />
          <Cards
            img={theatre}
            Title="Hall Manager"
            Text="List your business here for more opportunities."
            route="/banquet/google"
            variab="banquet"
          />
          <Cards
            img={food}
            Title="Food Caterer"
            Text="Take your catering business to the next level."
            route="/caterer/google"
            variab="caterer"
          />
          <Cards
            img={camera}
            Title="Photographer"
            Text="Are you a photographer?
    Get listed with us."
            route="/photographer/google"
            variab="photographer"
          />
        </Row>
        <Row style={{margin:"20px auto auto 0px"}}>
        <Col></Col>
        <Col style={{margin:"0px auto 40px 170px"}}>
        <Route
            render={({ history }) => (
              <Link
                variant="outline-dark"
                onClick={() => {
                  window.location.assign("/"+"admin"+"/google");
                  history.push("/admin/google");
                }}
              >
              Admin Login
              </Link>
            )}
          />
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Container>
  );
}

export default Home;
