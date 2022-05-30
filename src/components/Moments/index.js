import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import MemoryItem from "./Item";
import CONSTANTS from "./const";
import { memoriesActions } from "../../actions";
import NoItem from "./NoItem";

const Moments = (props) => {
  const dispatch = useDispatch();
  const listMemories = useSelector((state) => state.memories.list);
  const isLoading = useSelector((state) => state.memories.loading);

  const { callbackHandler } = props;

  // const handleLikedMemory = (itemId) => {
  //   console.log(`You liked memory with id: ${itemId}`);
  // };

  const handleDeleteMemory = async (itemId) => {
    let status = "error";
    const deletedData = await dispatch(memoriesActions.remove(itemId));
    if (deletedData) {
      status = "success";
    }

    await callbackHandler("TOGGLE", { open: true, type: "DELETE", status });
  };

  const handleEditMemory = (itemId) => {
    const item = listMemories.find((memory) => memory._id === itemId);
    callbackHandler("EDIT_MEMORY", item);
  };

  const CALLBACK_HANDLER = (actionType, value) => {
    switch (actionType) {
      case CONSTANTS.EDIT_MEMORY:
        handleEditMemory(value);
        break;
      case CONSTANTS.DELETE_MEMORY:
        handleDeleteMemory(value);
        break;
      case CONSTANTS.LIKE_MEMORY:
        // handleLikedMemory(value);
        // TODO:
        console.log("Liked");
        break;
      default:
        console.log(`default case, your actionType: ${actionType}`);
    }
  };

  if (!isLoading && listMemories.length === 0) {
    return <NoItem />;
  }

  if (isLoading && listMemories.length === 0) {
    return (
      <Grid container columns={12} spacing={2}>
        {[1, 2].map((value) => (
          <MemoryItem isLoading={isLoading} key={value} item={{}} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid container columns={12} spacing={2}>
      {listMemories.map((memory) => (
        <MemoryItem
          isLoading={isLoading}
          key={memory._id}
          item={memory}
          callbackHandler={CALLBACK_HANDLER}
        />
      ))}
    </Grid>
  );
};

Moments.propTypes = {
  callbackHandler: PropTypes.func,
};

Moments.defaultProps = {
  callbackHandler: () => {},
};

export default Moments;
