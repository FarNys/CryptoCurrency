import React, { useEffect, useState } from "react";
import "../styles/SingleCryptoExchange.css";

const SingleCryptoExchange = ({ item }) => {
  const { description } = item;
  const htmlString = description;

  return (
    <a href={item.websiteUrl}>
      <div className="single_cryptoexchange">
        <div className="top_card_exchange">
          <div className="box_cryptoexchange_name">
            {item.rank}. {item.name}
          </div>
          <div className="box_cryptoexchange_icon">
            <img src={item.iconUrl} alt={item.name} />
          </div>
        </div>
        <div
          className="back_card_exchange"
          dangerouslySetInnerHTML={{
            __html: htmlString ? htmlString : "<p>No Description to Show</p>",
          }}
        />
        <div className="mid_card_exchange">
          <p>Market Share : {+item.marketShare.toFixed(3)}%</p>
          <p># Of Markets : {item.numberOfMarkets}</p>
          <p>Volume : {item.volume}</p>
        </div>
        <div className="bot_card_footer">
          <p>
            Last Ticker: {new Date(item.lastTickerCreatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </a>
  );
};

export default SingleCryptoExchange;
