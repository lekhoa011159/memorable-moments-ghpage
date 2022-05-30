import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Resizer from "react-image-file-resizer";

import sx from "./styles";
import CONST from "./const";

const FormContent = (props) => {
  const [selectedFilename, changeSelectedFilename] = useState("No file chosen");
  const { title, content, tags, creator, callbackHandler } = props;

  const handleChange = (changeType) => (e) => {
    callbackHandler(changeType, e.target.value);
  };

  const handleUploadFile = async (evt) => {
    const { files } = await evt.target;
    const file = files[0];
    if (file) {
      const { name, type } = file;

      await changeSelectedFilename(name);
      await Resizer.imageFileResizer(
        file,
        400,
        400,
        type.split("/")[1],
        100,
        0,
        (uri) => callbackHandler(CONST.ADD_THUMBNAIL, uri)
      );
    }
  };

  return (
    <>
      <TextField
        fullWidth
        size="small"
        label="Creator"
        variant="outlined"
        value={creator}
        onChange={handleChange(CONST.CHANGE_AUTHOR)}
      />

      <TextField
        fullWidth
        size="small"
        label="Title"
        variant="outlined"
        value={title}
        onChange={handleChange(CONST.CHANGE_TITLE)}
      />
      <TextField
        multiline
        fullWidth
        size="small"
        rows={4}
        variant="outlined"
        label="What happened..."
        value={content}
        onChange={handleChange(CONST.CHANGE_CONTENT)}
      />
      <TextField
        fullWidth
        label="Tags (seperate by comma)"
        size="small"
        variant="outlined"
        value={tags}
        onChange={handleChange(CONST.CHANGE_TAGS)}
      />

      {/* <Box sx={sx.BoxFormFileBase}>
        <FileBase64 multiple={false} onDone={handleUploadFile} />
      </Box> */}
      <label
        title={selectedFilename}
        style={sx.LabelBtnUpload}
        htmlFor="contained-button-file"
      >
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleUploadFile}
          style={{ display: "none" }}
        />
        <Button
          sx={{ mr: (theme) => theme.spacing(1) }}
          variant="outlined"
          component="span"
          color="secondary"
        >
          Upload
        </Button>
        <Typography id="selected-filename" variant="body2" sx={sx.OverflowText}>
          {selectedFilename}
        </Typography>
      </label>
    </>
  );
};

FormContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.string,
  callbackHandler: PropTypes.func,
  creator: PropTypes.string,
};

FormContent.defaultProps = {
  creator: "",
  title: "",
  content: "",
  tags: "",
  callbackHandler: () => {},
};

export default FormContent;
