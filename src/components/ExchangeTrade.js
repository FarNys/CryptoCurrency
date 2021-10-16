import React, { useState, useEffect } from "react";
import { selectCoins } from "../features/getcoinsSlice";
import { useSelector } from "react-redux";
import "../styles/Exchange.css";

const ExchangeTrade = ({ dropdownValue }) => {
  const allCoins = useSelector(selectCoins);
  const [inputValue, setinputValue] = useState();
  const [resultValue, setresultValue] = useState();
  const filteredData = allCoins.filter(
    (el) => el.name.toLowerCase() === dropdownValue
  );
  const coinPrice = filteredData.length > 0 && filteredData[0].price;

  const valueController = (e) => {
    setinputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue < 0) {
      setresultValue(0);
    } else {
      setresultValue((inputValue * +coinPrice).toFixed(10));
    }
  }, [inputValue, coinPrice]);
  return (
    <div className="exchange_value_container">
      <div className="input_v_container">
        <label htmlFor="">Count(Number)</label>
        <input
          type="number"
          min="0"
          onChange={valueController}
          value={inputValue}
        />
      </div>
      <div className="exchange_icon_container">
        <img src="./images/free-coin.png" alt="exchange-icon" />
      </div>
      <div className="input_v_container">
        <label htmlFor="">Value($)</label>
        <input type="number" value={resultValue} disabled />
      </div>
    </div>
  );
};

export default ExchangeTrade;
