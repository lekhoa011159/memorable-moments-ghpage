import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fake loading for effect purpose
const sleep = (sec) => new Promise((resolve) => setTimeout(resolve, sec));

export const removeMemory = createAsyncThunk(
  "memories/delete",
  async (query) => {
    if (query !== "") {
      const { status } = await axios.delete(
        `https://salty-beyond-20522.herokuapp.com/apis/posts/v1?id=${query}`
      );
      await sleep(1500);
      if (status === 200) return query;
      return null;
    }
  }
);

export const getAll = createAsyncThunk(
  "memories/get",
  async (searchQuery, thunkAPI) => {
    try {
      let url = "https://salty-beyond-20522.herokuapp.com/apis/posts/v1";
      let isSearched = false;
      if (searchQuery) {
        const { title, author, offset } = searchQuery;
        url += "?";
        if (title) {
          url += `title=${encodeURIComponent(title)}`;
          isSearched = true;
        }
        if (author) {
          url += `&author=${encodeURIComponent(author)}`;
          isSearched = true;
        }
        if (offset) url += `&offset=${offset}`;
      }
      const {
        payload: { totalCounted },
      } = await thunkAPI.dispatch(getTotal(searchQuery));
      const { data } = await axios.get(url);

      if (data && data.length > 0) return { data, isSearched, totalCounted };
    } catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  }
);

export const getTotal = createAsyncThunk(
  "memories/getTotal",
  async (searchQuery) => {
    try {
      let url =
        "https://salty-beyond-20522.herokuapp.com/apis/posts/v1/totalCount";
      if (searchQuery) {
        const { title, author } = searchQuery;
        url += "?";
        if (title) url += `title=${encodeURIComponent(title)}`;
        if (author) url += `&author=${encodeURIComponent(author)}`;
      }
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(`Error: ${err}`);
      throw err;
    }
  }
);

export const createMemory = createAsyncThunk(
  "memories/create",
  async (post) => {
    const res = await axios.post(
      "https://salty-beyond-20522.herokuapp.com/apis/posts/v1",
      post
    );
    const { status, data } = res;

    if (status === 200) {
      await sleep(1500);
      return data;
    }

    return null;
  }
);

export const updateMemory = createAsyncThunk(
  "memories/update",
  async (post) => {
    const res = await axios.put(
      "https://salty-beyond-20522.herokuapp.com/apis/posts/v1",
      post
    );
    const { status } = res;

    if (status === 200) {
      await sleep(1500);
      return post;
    }

    return null;
  }
);
