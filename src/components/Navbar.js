import React from "react";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import HomeIcon from "@material-ui/icons/Home";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import "../styles/Navbar.scss";
import { motion } from "framer-motion";
import PieChartIcon from "@material-ui/icons/PieChart";
const Navbar = () => {
  // const clickHandler = (e) => {
  //   e.preventDefault();
  //   document.documentElement.style.setProperty("--color_1", "red");
  // };

  return (
    <div className="navbar_container">
      <div className="navbar_inside_container">
        <div className="logo_container">
          <svg width="50" height="50" className="svg_container">
            <motion.path
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: 1,
                pathLength: 1,
                transition: {
                  duration: 1,
                },
              }}
              d="M0 0 L50 0 L25 50 Z"
            />
            <motion.path
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: 1,
                pathLength: 1,
                transition: {
                  duration: 1,
                  delay: 0.7,
                },
              }}
              className="path"
              d="M30 10 L20 10 L20 20 L30 20"
            />
          </svg>
        </div>
        <div className="no_logo_container">
          <Link to="/" className="link_container">
            <div className="list_container">
              <HomeIcon />
              <h3>Home</h3>
            </div>
          </Link>
          <Link to="/home" className="link_container">
            <div className="list_container">
              <MonetizationOnIcon />
              <h3>Cryptos</h3>
            </div>
          </Link>
          <Link to="/exchange" className="link_container">
            <div className="list_container">
              <TrendingUpIcon />
              <h3>Exchange</h3>
            </div>
          </Link>
          <Link to="/cryptoexchange" className="link_container">
            <div className="list_container">
              <PieChartIcon />

              <h3>Crypto Trade</h3>
            </div>
          </Link>

          <Link to="/news" className="link_container">
            <div className="list_container">
              <RssFeedIcon />
              <h3>News Feed</h3>
            </div>
          </Link>
        </div>
        {/* <button onClick={clickHandler}>Click</button> */}
      </div>
    </div>
  );
};

export default Navbar;
