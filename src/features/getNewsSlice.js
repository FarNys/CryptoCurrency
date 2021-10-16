import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  news: [],
  currentNew: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getAllNews: (state, action) => {
      state.news = action.payload.newsData;
    },
  },
});
export const { getAllNews } = newsSlice.actions;
export const selectNews = (state) => state.news.news;
export default newsSlice.reducer;
