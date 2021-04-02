import React from "react";
import Cards from "./Cards";
import food from "./images/food.png";
import theatre from "./images/theater.png";
import camera from "./images/video-camera.png";
import customer from "./images/customer.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Home() {
  return (
    <Container>
      <div className="Container">
        <Row>
          <h1 style={{ textAlign: "center", margin: "50px 0px 0px 0px" }}>
            ONE SINGLE PLATFORM FOR VARIOUS IN-PERSON EVENTS !!
          </h1>
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
        
      </div>
    </Container>
  );
}

export default Home;
