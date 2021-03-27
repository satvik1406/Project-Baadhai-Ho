import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cuisine from "./home/Caterer/Cuisine";
import Hall from "./home/HallManager/hall";
import Photographer from "./home/Photographer/photographer";
import Home from "./home/Home";
import Footer from "./home/Footer";
import Header from "./home/Header";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
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
