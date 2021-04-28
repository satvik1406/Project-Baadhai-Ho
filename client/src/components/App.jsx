import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Customer from "./type/Customer";
import Cuisine from "./type/Cuisine";
import Hall from "./type/hall";
import Photographer from "./type/photographer";
import Home from "./basic/Home";
import Footer from "./basic/Footer";
import Header from "./basic/Header";
import Checkout from "./type/Checkout"
import Pay from "./type/pay"
import Container from "react-bootstrap/esm/Container";
import Admin from "./type/Admin";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/payment" exact component={Pay} />
            <Route path="/customer"  exact component={Customer} />
            <Route path="/checkout"  exact component={Checkout} />
            <Route path="/caterer"  exact component={Cuisine} />
            <Route path="/banquet" exact component={Hall} />
            <Route path="/photographer" exact component={Photographer} />
          </Switch>
        </Container>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
