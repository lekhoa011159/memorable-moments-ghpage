import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";

import { memoriesActions } from "../../actions";
import sx from "./styles";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import CONSTANTS from "./const";
import { getAll } from "../../actions/memories";

const Form = (props) => {
  const [postCreator, setPostCreator] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("");
  const [postThumbnail, setPostThumbnail] = useState("");

  useEffect(() => {
    if (props.selectedMemory) {
      const { title, content, author, tags, thumbnail } = props.selectedMemory;
      setPostTitle(title);
      setPostContent(content);
      setPostTags(tags.join(","));
      setPostCreator(author);
      setPostThumbnail(thumbnail);
    }
  }, [props.selectedMemory]);

  const dispatch = useDispatch();

  const CALLBACK_HANDLER = (actionType, value) => {
    switch (actionType) {
      case CONSTANTS.CHANGE_AUTHOR:
        setPostCreator(value);
        break;
      case CONSTANTS.CHANGE_CONTENT:
        setPostContent(value);
        break;
      case CONSTANTS.CHANGE_TITLE:
        setPostTitle(value);
        break;
      case CONSTANTS.CHANGE_TAGS:
        setPostTags(value);
        break;
      case CONSTANTS.ADD_THUMBNAIL:
        setPostThumbnail(value);
        break;
      case CONSTANTS.RESET_INPUT:
        handleClearText();
        break;
      case CONSTANTS.CREATE_MEMORY:
        handleSaveMemory(value);
        break;

      default:
        console.log(`default Case, your actionType is: ${actionType}`);
        return;
    }
  };

  const isDisabledCreateBtn = () => {
    return (
      postContent.length === 0 ||
      postTitle.length === 0 ||
      postCreator.length === 0
    );
  };

  const handleSaveMemory = async (e) => {
    const payload = {
      author: postCreator.trim(),
      title: postTitle.trim(),
      content: postContent.trim(),
      tags: postTags
        .trim()
        .split(",")
        .filter((tag) => tag !== ""),
      thumbnail: postThumbnail,
      createdAt: new Date().toString(),
    };

    e.preventDefault();
    handleClearText(e);

    let status = "error";
    if (props.selectedMemory) {
      // editting
      const editedData = await dispatch(
        memoriesActions.update({ ...props.selectedMemory, ...payload })
      );
      if (editedData.payload) {
        status = "success";
        props.callbackHandler("EDIT_MEMORY", null);
      }
    } else {
      const createdData = await dispatch(memoriesActions.create(payload));
      if (createdData.payload) {
        status = "success";
        dispatch(getAll());
      }
    }

    await props.callbackHandler("TOGGLE", {
      open: true,
      type: props.selectedMemory ? "EDIT" : "CREATE",
      status,
    });
  };

  const handleClearText = (e) => {
    setPostTitle("");
    setPostContent("");
    setPostTags("");
    setPostCreator("");
    setPostThumbnail("");
    document.querySelector("p#selected-filename").textContent =
      "No file chosen";
    props.callbackHandler("EDIT_MEMORY", null);
  };

  return (
    <Paper sx={sx.Paper} elevation={24}>
      <Box component="form" noValidate autoComplete="off" sx={sx.BoxFormFlex}>
        <Typography variant="h6" sx={sx.TypographyFormHeader}>
          {props.selectedMemory ? "EDIT" : "KEEP"} YOUR MEMORY HERE
        </Typography>

        <FormContent
          title={postTitle}
          content={postContent}
          tags={postTags}
          creator={postCreator}
          // thumbnail={postThumbnail}
          callbackHandler={CALLBACK_HANDLER}
        />
        <FormFooter
          isDisabledCreateBtn={isDisabledCreateBtn()}
          callbackHandler={CALLBACK_HANDLER}
        />
      </Box>
    </Paper>
  );
};

Form.propTypes = {
  callbackHandler: PropTypes.func,
  selectedMemory: PropTypes.object,
};

Form.defaultProps = {
  callbackHandler: () => {},
};

export default Form;
