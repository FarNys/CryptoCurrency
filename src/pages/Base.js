import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import LoaderComp from "../components/LoaderComp";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarkets, selectMarkets } from "../features/getMarketSlice";
import "../styles/Base.css";
import Market from "../components/Market";
const Base = () => {
  const containerVariants = {
    start: { opacity: 0, x: "-20vw" },
    finish: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      x: "100vw",
      transition: {
        duration: 0.6,
      },
    },
  };
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const dataMarket = useSelector(selectMarkets);
  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("https://coinranking1.p.rapidapi.com/markets", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key":
              "1a6718770emsh2f3695f15ac9900p1dcf9djsn42038a44656c",
          },
        });
        const data = await res.json();
        dispatch(
          getAllMarkets({
            marketData: data.data.markets,
          })
        );
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  if (loading) return <LoaderComp />;
  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="finish"
      exit="exit"
      className="base_container"
    >
      <div className="title_base">
        <h2>Cryptocurrency</h2>
      </div>
      <div className="text_container">
        <p>
          A cryptocurrency, crypto-currency, or crypto is a collection of binary
          data which is designed to work as a medium of exchange wherein
          individual coin ownership records are stored in a ledger which is a
          computerized database using strong cryptography to secure transaction
          records, to control the creation of additional coins, and to verify
          the transfer of coin ownership. (
          <a href="https://en.wikipedia.org/wiki/Cryptocurrency">WikiPedia</a>)
        </p>
      </div>
      <div className="market_container">
        <h3>Market Table</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th className="collapse_column">Symbol</th>
              <th className="collapse_column">Quote</th>
              <th className="collapse_col_last">Icon</th>
              <th>TickerBaseVolume</th>
              <th className="collapse_col_last">TickerClose</th>
              <th>Volume</th>
            </tr>
          </thead>
          {dataMarket.map((el) => (
            <Market key={el.uuid} el={el} />
          ))}
        </table>
      </div>
    </motion.div>
  );
};

export default Base;
