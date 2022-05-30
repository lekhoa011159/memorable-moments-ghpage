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
          path="/"
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
          path="/:id"
          element={<Details toggleSearchbarShow={toggleSearchbarShow} />}
        />
      </Routes>
    </Container>
  );
};

export default App;
