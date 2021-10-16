import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "../styles/SingleCrypto.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const SingleCrypto = ({ el, id }) => {
  const curPrice = (+el.price).toFixed(3);
  const percentage = ((+el.volume * 100) / +el.marketCap).toFixed(2);
  const singleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };
  return (
    <Link to={`/crypto/${el.id}`}>
      <motion.div className="crypto_box" variants={singleVariants}>
        <div className="top_crypto_box">
          <div className="top_left_box">
            <h3>
              {id + 1}. {el.name}
            </h3>
          </div>
          <div className="top_right_box">
            <Avatar src={el.iconUrl} />
          </div>
        </div>
        <div className="bot_crypto_box">
          <h4>Current Price</h4>: ${curPrice}
        </div>
        <div className="bot_crypto_box">
          <h4>Volume</h4>: {el.volume}
        </div>
        <div className="bot_crypto_box">
          <h4>MarketCap</h4>: {el.marketCap}
        </div>
        <div className="bot_crypto_box">
          <h4>Percentage</h4>: {percentage}%
        </div>
      </motion.div>
    </Link>
  );
};

export default SingleCrypto;
