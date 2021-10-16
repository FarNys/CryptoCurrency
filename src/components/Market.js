import React from "react";
import "../styles/Market.css";
const Market = ({ el }) => {
  return (
    <tbody>
      <tr>
        <td>{el.rank}</td>
        <td>{el.sourceName}</td>
        <td className="collapse_column">{el.baseSymbol}</td>
        <td className="collapse_column">{el.quoteSymbol}</td>
        <td className="collapse_col_last">
          <img src={el.sourceIconUrl} alt={el.name} />
        </td>
        <td>{el.tickerBaseVolume ? el.tickerBaseVolume : "- - -"}</td>
        <td className="collapse_col_last">{el.tickerClose}</td>
        <td>{el.volume}</td>
      </tr>
    </tbody>
  );
};

export default Market;
