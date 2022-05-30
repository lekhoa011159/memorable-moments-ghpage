import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const CreatedStatusSnackbar = (props) => {
  const { isOpen, callbackHandler, status, snackbarAction } = props;

  const onClose = () => {
    callbackHandler("TOGGLE", { open: false, type: "CLOSE" });
  };

  if (status !== "" && snackbarAction !== "")
    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key="top right"
      >
        <Alert onClose={onClose} severity={status} sx={{ width: "100%" }}>
          {snackbarAction} memory {status}!
        </Alert>
      </Snackbar>
    );
};

CreatedStatusSnackbar.propTypes = {
  isOpen: PropTypes.bool,
  callbackHandler: PropTypes.func,
  snackbarAction: PropTypes.oneOf(["CREATE", "DELETE", "EDIT", ""]),
  status: PropTypes.oneOf(["success", "error", ""]),
};

CreatedStatusSnackbar.defaultProps = {
  isOpen: false,
  callbackHandler: () => {},
  status: "",
};

export default CreatedStatusSnackbar;
