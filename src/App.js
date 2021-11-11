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
import { useDispatch } from "react-redux";
import { importAllCoins, getCoinData } from "./features/getcoinsSlice";
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
            "x-access-token":
              "coinrankingaf1ff7e237789e1f87c046650555ed7ec13c7b6a84dd0aef",
          },
        });
        const data = await res.json();
        console.log(data);
        dispatch(
          importAllCoins({
            importedCoins: data.data.coins,
          })
        );
        dispatch(
          getCoinData({
            coinDataTaker: data.data.stats,
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
