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
const DiagramMobile = ({ coinId, dropdownValue }) => {
  const [coinFullData, setcoinFullData] = useState();
  const [loading, setloading] = useState(false);

  let yData = [];
  let xData = [];
  let coinPrice;
  let coinMaxPrice;
  let coinMaxTime;
  const [information, setinformation] = useState({});
  const [informationMobile, setinformationMobile] = useState({});
  const [dateValue, setdateValue] = useState("24h");
  const [options, setoptions] = useState({});
  const coinData = coinId[0];
  const coinAllTime = coinData.allTimeHigh;
  const [colorDiagram, setcolorDiagram] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--color_2")
  );
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
    if (coinData.id !== undefined) {
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
                "x-access-token":
                  "coinrankingaf1ff7e237789e1f87c046650555ed7ec13c7b6a84dd0aef",
              },
            }
          );
          const datas = await result.json();
          // console.log(datas);
          setcoinFullData(datas);
          const { data } = datas;
          if (dateValue === "24h") {
            for (let i = 0; i < data.history.length; i = i + 40) {
              xData.push(
                new Date(data.history[i].timestamp).toLocaleDateString()
              );
              yData.push(data.history[i].price);
            }
          }
          if (dateValue === "7d") {
            for (let i = 0; i < data.history.length; i = i + 30) {
              xData.push(
                new Date(data.history[i].timestamp).toLocaleDateString()
              );
              yData.push(data.history[i].price);
            }
          }
          if (dateValue === "30d") {
            for (let i = 0; i < data.history.length; i = i + 85) {
              xData.push(
                new Date(data.history[i].timestamp).toLocaleDateString()
              );
              yData.push(data.history[i].price);
            }
          }
          if (dateValue === "1y") {
            for (let i = 0; i < data.history.length; i = i + 50) {
              xData.push(
                new Date(data.history[i].timestamp).toLocaleDateString()
              );
              yData.push(data.history[i].price);
            }
          }
          if (dateValue === "5y") {
            for (let i = 0; i < data.history.length; i = i + 200) {
              xData.push(
                new Date(data.history[i].timestamp).toLocaleDateString()
              );
              yData.push(data.history[i].price);
            }
          }

          // console.log(typeof dateValue);
          setinformation({
            labels: xData,
            datasets: [
              {
                label: "Price In USD",
                data: yData,
                fill: false,
                backgroundColor: colorDiagram,
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
      // console.log(88);
      getData();
    }
  }, [coinData, dateValue]);
  useEffect(() => {
    setcolorDiagram(
      getComputedStyle(document.documentElement).getPropertyValue("--color_2")
    );
    // console.log(77);
  }, [xData, dropdownValue]);
  if (loading) return <LoaderComp />;
  return (
    <>
      <div className="diagram_container diagram_container_mobile">
        <div className="diagram_datas">
          <h3>{dropdownValue.toUpperCase()}</h3>

          <div className="top_part_diagram">
            <div className="input_time">
              <div className="select_container select_container_mobile">
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
            <div className="input_time input_time_mobile">
              {coinFullData && (
                <h4>
                  Change in period of {dateValue} :{" "}
                  <span
                    className={
                      coinFullData.data.change > 0
                        ? "green_change"
                        : "red_change"
                    }
                  >
                    {coinFullData && coinFullData.data.change}{" "}
                  </span>
                </h4>
              )}
            </div>
            <div className="input_time input_time_mobile">
              {" "}
              <img src={coinId[0].iconUrl} alt={coinId[0].name} />
            </div>
          </div>
          <div className="bot_part_diagram bot_part_diagram_mobile">
            <div className="diagram_crypto diagram_crypto_mobile">
              <Line
                className="line_size line_size_mobile"
                data={information}
                options={options}
              />
            </div>
          </div>
          <div className="diagram_data diagram_data_mobile">
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

export default DiagramMobile;
