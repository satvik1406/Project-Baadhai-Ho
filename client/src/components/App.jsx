import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Customer from "./type/Customer";
import Cuisine from "./type/Cuisine";
import Hall from "./type/hall";
import Photographer from "./type/photographer";
import Home from "./basic/Home";
import Footer from "./basic/Footer";
import Header from "./basic/Header";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/customer"  exact component={Customer} />
          <Route path="/caterer"  exact component={Cuisine} />
          <Route path="/banquet" exact component={Hall} />
          <Route path="/photographer" exact component={Photographer} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
