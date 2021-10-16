import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  exchanges: [],
  otherData: [],
  otherStat: {},
  currentNew: "",
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    getAllExchanges: (state, action) => {
      state.exchanges = action.payload.exchangesData;
      state.otherData = action.payload.otherDatas;
      state.otherStat = action.payload.otherStats;
    },
  },
});
export const { getAllExchanges } = exchangeSlice.actions;
export const selectExchange = (state) => state.exchange.exchanges;
export const selectotherData = (state) => state.exchange.otherData;
export const selectotherStat = (state) => state.exchange.otherStat;
export default exchangeSlice.reducer;
