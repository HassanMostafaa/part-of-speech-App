import { configureStore } from "@reduxjs/toolkit";
import { scoreSlice } from "./score/scoreSlice";
import { wordsSlice } from "./words/wordsSlice";
import { rankSlice } from "./rank/rankSlice";

export const store = configureStore({
  reducer: {
    scoreReducer: scoreSlice.reducer,
    wordsReducer: wordsSlice.reducer,
    rankReducer: rankSlice.reducer,
  },
});
