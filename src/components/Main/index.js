import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memoriesActions } from "../../actions";
import { Container, Grid, Grow, Chip, Stack, Pagination } from "@mui/material";
import Form from "../Form";
import Moments from "../Moments";
import CreatedStatusSnackbar from "./Snackbar";
import { getAll } from "../../actions/memories";
import sx from "./styles";

const Main = (props) => {
  const dispatch = useDispatch();
  const isSearched = useSelector((state) => state.memories.isSearched);
  const isLoading = useSelector((state) => state.memories.isLoading);
  const totalCounted = useSelector((state) => state.memories.totalCounted);

  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState("success");
  const [snackbarAction, setSnackbarAction] = useState("");
  const [offset, onChangeOffset] = useState(1);
  const { searchObject, toggleSearchbarShow } = props;

  useEffect(() => {
    dispatch(memoriesActions.get());
    toggleSearchbarShow(true);
  }, [dispatch, toggleSearchbarShow]);

  const renderSearchedChip = () => {
    return Object.keys(searchObject).map((searchKey) => {
      if (searchObject[searchKey] !== "") {
        return (
          <Chip
            key={searchKey}
            sx={sx.Chip}
            label={`by ${searchKey}: ${searchObject[searchKey]}`}
            color="secondary"
            onDelete={handleDeleteSearch(searchKey)}
          />
        );
      }
      return null;
    });
  };

  const renderPagination = () => {
    return (
      <Stack spacing={2}>
        {totalCounted > 2 && (
          <Pagination
            count={calculatedCountPagination()}
            color="secondary"
            onChange={handleGetByOffset}
            sx={sx.Pagination}
          />
        )}
      </Stack>
    );
  };

  const calculatedCountPagination = () => {
    // <=> 2 items/page
    const totalPage = Math.round(totalCounted / 2);
    return totalPage;
  };

  const handleGetByOffset = (evt, os) => {
    onChangeOffset(os);
    if (isSearched) {
      dispatch(getAll({ offset: os, ...searchObject }));
    } else {
      dispatch(getAll({ offset: os }));
    }
  };

  const callbackHandler = (actionType, value) => {
    switch (actionType) {
      case "TOGGLE":
        handleValidateSnackbarStatus(value);
        break;
      case "EDIT_MEMORY":
        handleEditMemory(value);
        break;
      default:
        console.log(`default Case, your actionType is: ${actionType}`);
        return;
    }
  };

  const handleDeleteSearch = (searchKey) => () => {
    const modifiedSearchObject = { ...searchObject, [searchKey]: "" };
    props.onChangeSearch(modifiedSearchObject);
    dispatch(getAll(modifiedSearchObject));
  };

  const handleEditMemory = (item) => {
    setSelectedMemory(item);
  };

  const handleValidateSnackbarStatus = ({ open, type, status }) => {
    setSnackbarOpen(open);
    setSnackbarAction(type);
    setSnackbarStatus(status);

    if (type === "DELETE") {
      // after delete fetch all again.
      if (isSearched) {
        dispatch(getAll({ offset, ...searchObject }));
      } else {
        dispatch(getAll({ offset }));
      }
    }

    if (type === "CLOSE") {
      setSnackbarAction("");
      setSnackbarOpen(false);
    }
  };

  return (
    <Grow in>
      <Container sx={sx.Container}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          columns={12}
        >
          <Grid item xs={8}>
            {isSearched && renderSearchedChip()}
            <Moments callbackHandler={callbackHandler} />
            {!isLoading && renderPagination()}
          </Grid>
          <Grid item xs={4}>
            <Form
              callbackHandler={callbackHandler}
              selectedMemory={selectedMemory}
            />
          </Grid>
        </Grid>

        <CreatedStatusSnackbar
          isOpen={isSnackbarOpen}
          snackbarAction={snackbarAction}
          callbackHandler={callbackHandler}
          status={snackbarStatus}
        />
      </Container>
    </Grow>
  );
};

export default Main;
