import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExchangeTrade from "../components/ExchangeTrade";
import { selectCoins } from "../features/getcoinsSlice";
import "../styles/Exchange.css";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExchangeTradeReverse from "../components/ExchangeTradeReverse";
import Diagram from "../components/Diagram";
import { motion } from "framer-motion";

const Exchange = () => {
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
  const allCoins = useSelector(selectCoins);
  const [dropdownValue, setdropdownValue] = useState(
    allCoins.length > 0 && allCoins[0].name
  );
  const [coinId, setcoinId] = useState(allCoins.length > 0 && allCoins[0].name);
  const dropdownHandler = (e) => {
    setdropdownValue(e.target.value);
  };
  useEffect(() => {
    setcoinId(
      allCoins.filter((item) => item.name.toLowerCase() === dropdownValue)
    );
  }, [dropdownValue]);
  return (
    <motion.div
      className="exchange_container"
      variants={containerVariants}
      initial="start"
      animate="finish"
      exit="exit"
    >
      <div className="title_exchange">
        <h2>Exchange</h2>
      </div>

      <div className="dropdown_container">
        <div className="select_container">
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className="inputLabel">
                Choose Currency
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dropdownValue}
                label="Choose Currency"
                onChange={dropdownHandler}
                className="select_crypto"
              >
                {allCoins.map((el) => (
                  <MenuItem
                    key={el.uuid}
                    value={el.name.toLowerCase()}
                    className="option_crypto"
                  >
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="select_container">
          <ExchangeTrade dropdownValue={dropdownValue} />
          <ExchangeTradeReverse dropdownValue={dropdownValue} />
        </div>
      </div>
      <div className="diagram_parent">
        {" "}
        {coinId.length > 0 && (
          <Diagram coinId={coinId} dropdownValue={dropdownValue} />
        )}
      </div>
    </motion.div>
  );
};

export default Exchange;
