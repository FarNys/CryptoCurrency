import React, { useState, useRef, useEffect } from "react";
import { selectCoins, selectCoinsData } from "../features/getcoinsSlice";
import { useSelector, useDispatch } from "react-redux";
import SingleCrypto from "../components/SingleCrypto";
import "../styles/Home.css";
// import SearchIcon from "@material-ui/icons/Search";
import { motion } from "framer-motion";
import { importAllCoins, getCoinData } from "../features/getcoinsSlice";
const Home = () => {
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
  const [index, setindex] = useState(9);

  let allCoins = useSelector(selectCoins);
  let coinDatas = useSelector(selectCoinsData);

  const [arr, setarr] = useState([]);
  const cryptoRef = useRef(null);
  // allCoins = allCoins.slice(0, index);
  const cryptoNumHandler = (e) => {
    e.preventDefault();
    setindex(index + 9);
    // setfilteredData(allCoins.slice(0, index));
  };

  const collapsehandler = (e) => {
    e.preventDefault();
    setindex(9);
  };
  const cryptoVariants = {
    hidden: { x: -25 },
    show: {
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };
  // const [searchValue, setsearchValue] = useState("");

  const dispatch = useDispatch();
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
        // console.log(data);
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
  }, [dispatch]);
  useEffect(() => {
    setarr(allCoins.slice(0, index));
    // console.log(55);
  }, [index, allCoins]);

  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="finish"
      exit="exit"
      className="home_container"
    >
      <div className="title_home">
        <h2>Crypto</h2>
      </div>
      {/* <div className="search_crypto">
        <SearchIcon className="search_icon" onClick={searchSubmit} />
        <input
          type="text"
          placeholder="type crypto name"
          onChange={searchHandler}
        />
      </div> */}

      {coinDatas && (
        <div className="otherdata_crypto">
          <div className="crypto_other_datas">Total : {coinDatas.total}</div>

          <div className="crypto_other_datas">
            Tota 24h Volume : {coinDatas.total24hVolume}
          </div>
          <div className="crypto_other_datas">
            Total Exchange : {coinDatas.totalExchanges}
          </div>
          <div className="crypto_other_datas">
            Total MarketCap : {coinDatas.totalMarketCap}
          </div>
          <div className="crypto_other_datas">
            Total Markets : {coinDatas.totalMarkets}
          </div>
        </div>
      )}
      {/* <h3>{coinDatas.total}</h3> */}
      {allCoins.length > 0 && (
        <motion.div
          ref={cryptoRef}
          className="currency_box"
          variants={cryptoVariants}
          initial="hidden"
          animate="show"
        >
          {allCoins.slice(0, index).map((el, id) => (
            <SingleCrypto el={el} id={id} key={el.uuid} />
          ))}
        </motion.div>
      )}
      <div className="btn_container">
        {index > 10 && <button onClick={collapsehandler}>Collapse</button>}
        <button onClick={cryptoNumHandler}>Expand</button>
      </div>
    </motion.div>
  );
};

export default Home;
