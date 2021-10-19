import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  coins: [],
  coinData: {},
  currentCoin: "",
  currentPage: "",
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    importAllCoins: (state, action) => {
      state.coins = action.payload.importedCoins;
    },
    getCoinData: (state, action) => {
      state.coinData = action.payload.coinDataTaker;
    },
  },
});
export const { importAllCoins, getCoinData } = coinsSlice.actions;
export const selectCoins = (state) => state.coins.coins;
export const selectCoinsData = (state) => state.coins.coinData;
export default coinsSlice.reducer;
