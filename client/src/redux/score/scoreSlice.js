import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: localStorage.getItem("score") || 0,
};

export const scoreSlice = createSlice({
  name: "scoreSlice",
  initialState,
  reducers: {
    addScore: (state) => {
      state.score += 10;
    },
    resetScore: (state) => {
      state.score = 0;
    },
  },
  extraReducers: {},
});

export const { addScore, resetScore } = scoreSlice.actions;
