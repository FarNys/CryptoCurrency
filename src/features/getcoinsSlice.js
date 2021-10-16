import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  coins: [],
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
  },
});
export const { importAllCoins } = coinsSlice.actions;
export const selectCoins = (state) => state.coins.coins;
export default coinsSlice.reducer;
