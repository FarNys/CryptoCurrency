import React, { useState, useRef } from "react";
import { selectCoins } from "../features/getcoinsSlice";
import { useSelector } from "react-redux";
import SingleCrypto from "../components/SingleCrypto";
import "../styles/Home.css";
import { motion } from "framer-motion";
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
  let allCoins = useSelector(selectCoins);
  const [index, setindex] = useState(9);
  const cryptoRef = useRef(null);
  allCoins = allCoins.slice(0, index);
  const cryptoNumHandler = (e) => {
    e.preventDefault();

    setindex(index + 9);
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
      {allCoins.length > 0 && (
        <motion.div
          ref={cryptoRef}
          className="currency_box"
          variants={cryptoVariants}
          initial="hidden"
          animate="show"
        >
          {allCoins.map((el, id) => (
            <SingleCrypto el={el} id={id} key={el.uuid} />
          ))}
        </motion.div>
      )}
      <div className="btn_container">
        {index > 10 && <button onClick={collapsehandler}>Collapse</button>}
        <button onClick={cryptoNumHandler}>Show More</button>
      </div>
    </motion.div>
  );
};

export default Home;
