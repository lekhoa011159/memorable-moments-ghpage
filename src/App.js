import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Details from "./components/Details";

const App = () => {
  const [isSearchbarShow, setSearchbarShowStatus] = useState(true);
  const [searchObject, setSearchObject] = useState({
    title: "",
    // tags: "",
    author: "",
  });

  const handleSearch = (search) => {
    setSearchObject(search);
  };

  const toggleSearchbarShow = (value) => {
    setSearchbarShowStatus(value);
  };

  return (
    <Container maxWidth="lg">
      <Navbar isSearchbarShow={isSearchbarShow} onChangeSearch={handleSearch} />
      <Routes>
        <Route
          path="/memorable-moments-ghpage"
          exact
          element={
            <Main
              searchObject={searchObject}
              onChangeSearch={handleSearch}
              toggleSearchbarShow={toggleSearchbarShow}
            />
          }
        />
        <Route
          path="/memorable-moments-ghpage/:id"
          element={<Details toggleSearchbarShow={toggleSearchbarShow} />}
        />
        <Route
          path="*"
          element={
            <img
              src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
              alt="fallback_notfound"
              style={{
                margin: "0 auto",
                display: "block",
                marginTop: 16,
                width: "100%",
              }}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
