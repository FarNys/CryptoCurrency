import React, { useEffect } from "react";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { importAllCoins } from "./features/getcoinsSlice";
import Exchange from "./pages/Exchange";
import News from "./pages/News";
import "./index.css";
import Crypto from "./pages/Crypto";
import Base from "./pages/Base";
import CryptoExchange from "./pages/CryptoExchange";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://coinranking1.p.rapidapi.com/coins", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key":
              "1a6718770emsh2f3695f15ac9900p1dcf9djsn42038a44656c",
          },
        });
        const data = await res.json();
        dispatch(
          importAllCoins({
            importedCoins: data.data.coins,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    // <Router>
    <div className="router_container">
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/" exact>
            <Base />
          </Route>
          <Route path="/home" exact>
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
        </Switch>
      </AnimatePresence>
    </div>
    // </Router>
  );
};

export default App;
