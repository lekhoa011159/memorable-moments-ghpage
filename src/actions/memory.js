import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fake loading for effect purpose
const sleep = (sec) => new Promise((resolve) => setTimeout(resolve, sec));

export const getMemoryItem = createAsyncThunk("memory/get", async (itemId) => {
  try {
    const { data } = await axios.get(
      `https://salty-beyond-20522.herokuapp.com/apis/posts/v1/${itemId}`
    );
    if (data)
      // await sleep(2000);
      return data;
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
      if (data)
        // await sleep(2000);
        return data;
    } catch (err) {
      return null;
    }
  }
);
