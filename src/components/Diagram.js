import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../styles/Diagram.css";
import "../styles/Exchange.css";
import LoaderComp from "./LoaderComp";
const Diagram = ({ coinId, dropdownValue }) => {
  const [coinFullData, setcoinFullData] = useState();
  const [loading, setloading] = useState(false);
  let yData = [];
  let xData = [];
  let coinPrice;
  let coinMaxPrice;
  let coinMaxTime;
  const [information, setinformation] = useState({});
  const [dateValue, setdateValue] = useState("24h");
  const [options, setoptions] = useState({});
  const coinData = coinId[0];
  const coinAllTime = coinData.allTimeHigh;
  if (coinFullData) {
    coinPrice = (+coinData.price).toFixed(3);
    coinMaxPrice = (+coinAllTime.price).toFixed(3);
    coinMaxTime = new Date(coinAllTime.timestamp).toLocaleDateString();
  }

  const datePicker = ["24h", "7d", "30d", "1y", "5y"];
  const dateValueHandler = (e) => {
    setdateValue(e.target.value);
  };
  const [coinDesc, setcoinDesc] = useState();
  useEffect(() => {
    setloading(true);
    const getData = async () => {
      try {
        const result = await fetch(
          `https://coinranking1.p.rapidapi.com/coin/${coinData.id}/history/${dateValue}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "coinranking1.p.rapidapi.com",
              "x-rapidapi-key":
                "1a6718770emsh2f3695f15ac9900p1dcf9djsn42038a44656c",
            },
          }
        );
        const datas = await result.json();
        setcoinFullData(datas);
        console.log(datas);
        const { data } = datas;
        for (let i = 0; i < data.history.length; i++) {
          xData.push(new Date(data.history[i].timestamp).toLocaleDateString());
          yData.push(data.history[i].price);
        }
        setinformation({
          labels: xData,
          datasets: [
            {
              label: "Price In USD",
              data: yData,
              fill: false,
              backgroundColor: "#93f9b9",
              borderColor: "#333",
            },
          ],
        });
        setoptions({
          plugins: {
            title: {
              display: true,
              text: dropdownValue.toUpperCase() + " Diagram",
            },
          },
        });
        setcoinDesc(HTMLReactParser(coinData.description));
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [coinData, dateValue]);
  if (loading) return <LoaderComp />;
  return (
    <>
      <div className="diagram_container">
        <h3>{dropdownValue.toUpperCase()}</h3>

        <div className="top_part_diagram">
          <div className="input_time">
            <div className="select_container">
              <Box>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dateValue}
                    label="Choose Currency"
                    onChange={dateValueHandler}
                    className="select_timer"
                  >
                    {datePicker.map((el, id) => (
                      <MenuItem key={id} value={el} className="option_crypto">
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <div className="input_time">
            <h4>
              Change in period of {dateValue} :{" "}
              {coinFullData && coinFullData.data.change} $
            </h4>
          </div>
          <div className="input_time">
            {" "}
            <img src={coinId[0].iconUrl} alt={coinId[0].name} />
          </div>
        </div>
        <div className="bot_part_diagram">
          <div className="diagram_crypto">
            {" "}
            <Line data={information} options={options} />
          </div>
          <div className="diagram_data">
            <div className="left_side">
              <h5>Current Value : {coinPrice} $</h5>
            </div>
            <div className="right_side">
              <h5>Max Value : {coinMaxPrice} $</h5>
              <span>({coinMaxTime})</span>
            </div>
          </div>
        </div>
      </div>
      <div className="crypto_desc">
        <h3>About {coinData.name}</h3>
        <p>{coinDesc}</p>
      </div>
    </>
  );
};

export default Diagram;
