import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questionIndex: null,
  words: null,
  error: null,
  loading: false,
};
const wordsURL = "http://localhost:3000/api/words";

export const fetchWords = createAsyncThunk(
  "fetch10RandomWordsObjs",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(wordsURL);
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const wordsSlice = createSlice({
  name: "wordsSlice",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      state.questionIndex += 1;
    },
    resetWords: (state) => {
      state.questionIndex = null;
      state.words = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [fetchWords.fulfilled]: (state, { payload }) => {
      state.words = payload.results;
      state.loading = false;
      state.questionIndex = 0;
    },
    [fetchWords.pending]: (state) => {
      state.words = null;
      state.loading = true;
    },
    [fetchWords.rejected]: (state, { payload }) => {
      state.words = null;
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { nextQuestion, resetWords } = wordsSlice.actions;
