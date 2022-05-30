import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMemoryItem = createAsyncThunk("memory/get", async (itemId) => {
  try {
    const { data } = await axios.get(
      `https://salty-beyond-20522.herokuapp.com/apis/posts/v1/${itemId}`
    );
    if (data) return data;
    return null;
  } catch (err) {
    return null;
  }
});

export const getRecommendItem = createAsyncThunk(
  "memory/getRecommend",
  async (item) => {
    const { tags, _id } = item;
    let query = `&withId=${_id}`;
    if (tags !== "") query = `?tags=${tags}${query}`;
    else query = `?withId=${_id}`;

    try {
      const { data } = await axios.get(
        `https://salty-beyond-20522.herokuapp.com/apis/posts/v1/by${query}`
      );
      if (data) return data;
    } catch (err) {
      return null;
    }
  }
);
