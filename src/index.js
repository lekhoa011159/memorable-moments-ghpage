import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import "./index.css";
import memoriesReducer from "./reducers/memories";
import memoryItemReducer from "./reducers/memory";

const store = configureStore({
  reducer: {
    memories: memoriesReducer,
    memory: memoryItemReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
