import React, { useEffect } from "react";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import Page404 from "./pages/Page404";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exchange from "./pages/Exchange";
import News from "./pages/News";
import "./index.css";
import Crypto from "./pages/Crypto";
import Base from "./pages/Base";
import CryptoExchange from "./pages/CryptoExchange";
const App = () => {
  const location = useLocation();
  return (
    // <Router>
    <div className="router_container">
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/" exact>
            <Base />
          </Route>
          <Route path="/crypto" exact>
            <Home />
          </Route>
          <Route path="/exchange" exact>
            <Exchange />
          </Route>
          <Route path="/cryptoexchange" exact>
            <CryptoExchange />
          </Route>

          <Route path="/news">
            <News />
          </Route>
          <Route path="/crypto/:id">
            <Crypto />
          </Route>
          <Route path="*" exact>
            <Page404 />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
    // </Router>
  );
};

export default App;
