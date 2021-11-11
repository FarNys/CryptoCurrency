import React, { useState, useEffect } from "react";
import LoaderComp from "../components/LoaderComp";
import { motion } from "framer-motion";

import {
  getAllExchanges,
  selectExchange,
  selectotherData,
  selectotherStat,
} from "../features/getExchangesSlice";
import "../styles/CryptoExchange.css";
import SingleCryptoExchange from "../components/SingleCryptoExchange";
import { useDispatch, useSelector } from "react-redux";
import DoughnutContainer from "../components/DoughnutContainer";
const CryptoExchange = () => {
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
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF".split("");
    let colors = "#";
    for (var m = 0; m < 6; m++) {
      colors += letters[Math.floor(Math.random() * 15)];
    }
    return colors;
  };
  let labelData = [];
  let rData = [];
  let colorData = [];
  const [information, setinformation] = useState({});
  const allExchanges = useSelector(selectExchange);
  // const allotherData = useSelector(selectotherData);
  const allotherStat = useSelector(selectotherStat);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    const getExchanges = async () => {
      const res = await fetch("https://coinranking1.p.rapidapi.com/exchanges", {
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
      dispatch(
        getAllExchanges({
          exchangesData: data.data.exchanges,
          otherDatas: data.data.currencies,
          otherStats: data.data.stats,
        })
      );
      for (let i = 0; i < allExchanges.length; i++) {
        labelData.push(allExchanges[i].name);
      }
      for (let j = 0; j < allExchanges.length; j++) {
        rData.push(allExchanges[j].marketShare);
      }
      for (let k = 0; k < allExchanges.length; k++) {
        colorData.push(getRandomColor());
      }

      setinformation({
        labels: labelData,
        datasets: [
          {
            label: "Pie Chart!!",
            data: rData,
            backgroundColor: colorData,
          },
        ],
      });
      setloading(false);
    };
    getExchanges();
  }, [dispatch]);
  if (loading) return <LoaderComp />;
  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="finish"
      exit="exit"
      className="cryptoExchange_container"
    >
      <div className="title_cryptoExchange">
        <h2>Crypto Exchanges</h2>
      </div>

      <div className="all_exchanges">
        <div className="inner_exchange">Limit : {allotherStat.limit}</div>
        <div className="inner_exchange">Total : {allotherStat.total}</div>
        <div className="inner_exchange">Volume : {allotherStat.volume}</div>
      </div>

      {information && (
        <div className="pie_chart_container">
          <h3>Market Share</h3>
          <DoughnutContainer information={information} />
        </div>
      )}
      <div className="box_exchange_container">
        {allExchanges.map((item) => (
          <SingleCryptoExchange item={item} key={item.uuid} />
        ))}
      </div>
    </motion.div>
  );
};

export default CryptoExchange;
