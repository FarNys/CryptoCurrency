import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "../features/getcoinsSlice";
import marketsReducer from "../features/getMarketSlice";
import newsReducer from "../features/getNewsSlice";
import exchangesReducer from "../features/getExchangesSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    markets: marketsReducer,
    news: newsReducer,
    exchange: exchangesReducer,
  },
});
