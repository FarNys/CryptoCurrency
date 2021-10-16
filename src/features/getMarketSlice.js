import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  markets: [],
  currentMarket: "",
};

const marketSlice = createSlice({
  name: "markets",
  initialState,
  reducers: {
    getAllMarkets: (state, action) => {
      state.markets = action.payload.marketData;
    },
  },
});
export const { getAllMarkets } = marketSlice.actions;
export const selectMarkets = (state) => state.markets.markets;
export default marketSlice.reducer;
