import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  rank: null,
  loading: false,
  state: null,
  error: null,
};

export const calculateRank = createAsyncThunk(
  "calcRankRedux",
  async ({ score }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/api/rank", { score });
      const data = await res.data;

      return data.rank;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rankSlice = createSlice({
  name: "rankSlice",
  initialState,
  reducers: {
    resetRank: (state) => {
      state.rank = null;
      state.loading = false;
      state.state = null;
      state.error = null;
    },
  },
  extraReducers: {
    [calculateRank.fulfilled]: (state, { payload }) => {
      state.rank = payload;
      state.loading = false;
      state.state = "success";
    },
    [calculateRank.pending]: (state) => {
      state.loading = true;
    },
    [calculateRank.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.state = "failed";
    },
  },
});

export const { resetRank } = rankSlice.actions;
