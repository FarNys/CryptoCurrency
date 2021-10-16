import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoNew from "../components/CryptoNew";
import { getAllNews, selectNews } from "../features/getNewsSlice";
import "../styles/News.css";
import { motion } from "framer-motion";
import LoaderComp from "../components/LoaderComp";
const News = () => {
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
  const allNews = useSelector(selectNews);
  const dispatch = useDispatch();
  const [newsCount, setnewsCount] = useState(9);
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
  useEffect(() => {
    setloading(true);
    const getNews = async () => {
      const res = await fetch(
        `https://bing-news-search1.p.rapidapi.com/news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&reshness=Day&count=${newsCount}`,
        {
          method: "GET",
          headers: {
            "x-bingapis-sdk": "true",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            "x-rapidapi-key":
              "1a6718770emsh2f3695f15ac9900p1dcf9djsn42038a44656c",
          },
        }
      );
      const data = await res.json();
      dispatch(
        getAllNews({
          newsData: data.value,
        })
      );
      setloading(false);
    };
    getNews();
  }, [dispatch, newsCount]);
  const cryptoNumHandler = (e) => {
    e.preventDefault();
    if (newsCount < 25) {
      setnewsCount(newsCount + 5);
    }
  };
  const collapsehandler = (e) => {
    e.preventDefault();
    setnewsCount(9);
  };
  if (loading) return <LoaderComp />;
  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="finish"
      exit="exit"
      className="news_container"
    >
      <div className="title_news">
        <h2>News</h2>
      </div>
      <div className="text_container">
        <p>Find The Latest News About Crypto Worlds !</p>
      </div>
      <motion.div
        variants={cryptoVariants}
        initial="hidden"
        animate="show"
        className="news_cards_container"
      >
        {allNews.map((el, id) => (
          <CryptoNew el={el} key={id} />
        ))}
      </motion.div>
      <div className="btn_container">
        {newsCount > 13 && <button onClick={collapsehandler}>Collapse</button>}
        <button onClick={cryptoNumHandler}>Show More</button>
      </div>
    </motion.div>
  );
};

export default News;
