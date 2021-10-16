import React from "react";
import "../styles/CryptoNews.css";
import { motion } from "framer-motion";
const CryptoNew = ({ el }) => {
  const { image, provider } = el;
  const singleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };
  return (
    <a href={el.url}>
      <motion.div variants={singleVariants} className="single_news_container">
        <div className="card_sideOne">
          <div className="card_image">
            <h3>{el.name.split(" ").splice(0, 10).join(" ")} . . .</h3>
            {image && <img src={image.thumbnail.contentUrl} alt={el.name} />}
          </div>

          <p>{el.description}</p>
          <div className="date_category">
            <span>{new Date(el.datePublished).toLocaleString()}</span>
            <span>{el.category || "No Category"}</span>
          </div>
        </div>
        <div className="card_sideTwo">
          <div className="provider_name">{provider[0].name}</div>
          <div className="provider_icon">
            {provider[0].image && (
              <img
                src={provider[0].image.thumbnail.contentUrl}
                alt={provider[0].name}
              />
            )}
          </div>
        </div>
      </motion.div>
    </a>
  );
};

export default CryptoNew;
