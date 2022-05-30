import React from "react";
import PropTypes from "prop-types";
import { TextField, Dialog, Button, DialogContent, Paper } from "@mui/material";

import CONSTANTS from "./consts";

const ModalSearch = (props) => {
  const { callbackHandler, isOpen } = props;
  const [searchObject, setSearchObject] = React.useState({
    title: "",
    author: "",
  });

  const handleCloseDialog = () => {
    callbackHandler(CONSTANTS.CLOSE_DIALOG);
  };

  const handleChangeText = (searchType) => (e) => {
    setSearchObject({ ...searchObject, [searchType]: e.target.value });
  };

  const handleSearchMemory = () => {
    callbackHandler(CONSTANTS.CONFIRM_SEARCH, searchObject);
  };

  const isDisabledBtn = () => {
    const { title, author } = searchObject;
    return title === "" && author === "";
  };

  return (
    <Paper elevation={24}>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            label="By Title"
            variant="outlined"
            value={searchObject["title"]}
            onChange={handleChangeText("title")}
          />

          <TextField
            margin="normal"
            fullWidth
            label="By Author"
            variant="outlined"
            value={searchObject["author"]}
            onChange={handleChangeText("author")}
          />

          <TextField
            disabled
            margin="normal"
            fullWidth
            label="By Tags (coming soon)"
            variant="outlined"
            value=""
            // onChange={handleChangeText("tags")}
          />

          <Button
            sx={{ marginTop: (theme) => theme.spacing(1) }}
            fullWidth
            disableRipple
            color="secondary"
            variant="contained"
            onClick={handleSearchMemory}
            disabled={isDisabledBtn()}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

ModalSearch.propTypes = {
  callbackHandler: PropTypes.func,
  isOpen: PropTypes.bool,
};

ModalSearch.defaultProps = {
  callbackHandler: () => {},
  isOpen: false,
};

export default ModalSearch;
