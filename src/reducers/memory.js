import { createSlice } from "@reduxjs/toolkit";
import { memoriesActions } from "../actions";
import memoryBuilders from "../actions/memory.builders";

const { getItem, getRecommend } = memoriesActions;

const initialState = {
  memoryItem: null,
  loading: true,
  recommendItems: [],
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getItem.pending, memoryBuilders.get.pending)
      .addCase(getItem.fulfilled, memoryBuilders.get.fulfilled)
      .addCase(getItem.rejected, memoryBuilders.get.rejected)

      .addCase(getRecommend.pending, memoryBuilders.getRecommend.pending)
      .addCase(getRecommend.fulfilled, memoryBuilders.getRecommend.fulfilled)
      .addCase(getRecommend.rejected, memoryBuilders.getRecommend.rejected);
  },
});

export default memorySlice.reducer;
