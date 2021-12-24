import React, { useState } from "react";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import HomeIcon from "@material-ui/icons/Home";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import "../styles/Navbar.scss";
import { motion } from "framer-motion";
import PieChartIcon from "@material-ui/icons/PieChart";
import BrightnessMediumIcon from "@material-ui/icons/BrightnessMedium";
const Navbar = () => {
  const colorArr = [
    "--color_0",
    "--color_1",
    "--color_2",
    "--color_2_1",
    "--color_3",
    "--color_4",
  ];
  const [themeStyle, setthemeStyle] = useState("#93f9b9");

  const bluethemeHandler = () => {
    if (themeStyle === "#93f9b9") {
      setthemeStyle("#12d8fa");
      document.documentElement.style.setProperty(colorArr[0], "#fff");
      document.documentElement.style.setProperty(colorArr[1], "#3f3f3f");
      document.documentElement.style.setProperty(colorArr[2], "#12d8fa");
      document.documentElement.style.setProperty(colorArr[3], "#12d8fa25");
      document.documentElement.style.setProperty(colorArr[4], "#16a085");
      document.documentElement.style.setProperty(colorArr[5], "#1fa2ff");
    }
    if (themeStyle === "#12d8fa") {
      setthemeStyle("#93f9b9");

      document.documentElement.style.setProperty(colorArr[0], "#fff");
      document.documentElement.style.setProperty(colorArr[1], "#3f3f3f");
      document.documentElement.style.setProperty(colorArr[2], "#93f9b9");
      document.documentElement.style.setProperty(colorArr[3], "#93f9b825");
      document.documentElement.style.setProperty(colorArr[4], "#003973");
      document.documentElement.style.setProperty(colorArr[5], "#3ca55c");
    }
  };

  return (
    <div className="navbar_container">
      <div className="navbar_inside_container">
        <div className="logo_container">
          <img src="images/bitcoin.png" alt="bitcoin-Logo" />
        </div>
        <div className="no_logo_container">
          <Link to="/" className="link_container">
            <div className="list_container">
              <HomeIcon />
              <h3>Home</h3>
            </div>
          </Link>
          <Link to="/crypto" className="link_container">
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
          <button className="link_container" onClick={bluethemeHandler}>
            <div className="list_container">
              <BrightnessMediumIcon />
              <h3>Change Theme</h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
