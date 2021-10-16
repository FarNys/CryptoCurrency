import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/Crypto.css";
import HTMLReactParser from "html-react-parser";
import { motion } from "framer-motion";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import RedditIcon from "@material-ui/icons/Reddit";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LoaderComp from "../components/LoaderComp";
const Crypto = () => {
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
  const icon_Social = [
    { icon: <LanguageIcon /> },
    { icon: <TelegramIcon style={{ color: "#0088cc" }} /> },
    { icon: <RedditIcon style={{ color: "#ff4500	" }} /> },
    { icon: <TwitterIcon style={{ color: "#1DA1F2" }} /> },
    { icon: <YouTubeIcon style={{ color: "#FF0000" }} /> },
    { icon: <FacebookIcon style={{ color: "#3b5998" }} /> },
    { icon: <GitHubIcon style={{ color: "#171515" }} /> },
  ];
  const { id } = useParams();
  const [crypto, setcrypto] = useState();
  const [cryptoDesc, setcryptoDesc] = useState();
  const [cryptoLinks, setcryptoLinks] = useState([]);
  useEffect(() => {
    setloading(true);
    const getCrypto = async () => {
      try {
        const res = await fetch(
          `https://coinranking1.p.rapidapi.com/coin/${id}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "coinranking1.p.rapidapi.com",
              "x-rapidapi-key":
                "1a6718770emsh2f3695f15ac9900p1dcf9djsn42038a44656c",
            },
          }
        );
        const data = await res.json();
        setcrypto(data.data.coin);
        setcryptoDesc(HTMLReactParser(data.data.coin.description));
        setcryptoLinks(data.data.coin.links);
        console.log(cryptoLinks);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCrypto();
  }, [id]);
  if (loading) return <LoaderComp />;
  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="finish"
      exit="exit"
      className="crypto_container"
    >
      {crypto && (
        <div>
          <div className="title_crypto">
            <h2>{crypto.name}</h2>
          </div>
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            className="crypto_desc_container"
          >
            {cryptoDesc}
          </motion.div>
          <div className="statistical_data_container">
            <div className="topside_data">
              <h3>Statistical Data</h3>
            </div>
            <div className="botside_data">
              <motion.div
                initial={{
                  x: -60,
                  opacity: 0.5,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.7,
                    delay: 0.3,
                  },
                }}
                className="leftside_data_container"
              >
                <h3>Data</h3>
                <div className="data_container">
                  <p>Rank</p> : {crypto.rank}
                </div>
                <div className="data_container">
                  <p>FirstSeen </p>:{" "}
                  {new Date(crypto.firstSeen).toLocaleDateString()}
                </div>
                <div className="data_container">
                  <p>MarketCap</p> : {crypto.marketCap}
                </div>
                <div className="data_container">
                  <p>NumberOfExchanges</p> : {crypto.numberOfExchanges}
                </div>
                <div className="data_container">
                  <p>Type</p> : {crypto.type}
                </div>
                <div className="data_container">
                  <p>Volume</p> : {crypto.volume}
                </div>
                <div className="data_container">
                  <p>Website:</p>{" "}
                  <a href={crypto.websiteUrl}> {crypto.websiteUrl}</a>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 60, opacity: 0.5 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.7,
                    delay: 0.3,
                  },
                }}
                className="rightside_data_container"
              >
                <div className="links_container">
                  <h3>Links</h3>
                  {cryptoLinks.map((el) => (
                    <motion.div
                      whileHover={{
                        x: 10,
                      }}
                      className="data_container"
                    >
                      <li>{el.type === "website" && icon_Social[0].icon}</li>
                      <li>{el.type === "telegram" && icon_Social[1].icon}</li>
                      <li>{el.type === "reddit" && icon_Social[2].icon}</li>
                      <li>{el.type === "twitter" && icon_Social[3].icon}</li>
                      <li>{el.type === "youtube" && icon_Social[4].icon}</li>
                      <li>{el.type === "facebook" && icon_Social[5].icon}</li>
                      <li>{el.type === "github" && icon_Social[6].icon}</li>
                      <a href={el.url}>{el.name}</a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Crypto;
