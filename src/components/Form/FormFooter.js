import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import sx from "./styles";
import CONSTANTS from "./const";

const FormFooter = (props) => {
  const { isDisabledCreateBtn, callbackHandler } = props;

  const handleClick = (actionType) => (evt) => {
    callbackHandler(actionType, evt);
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        disabled={isDisabledCreateBtn}
        sx={sx.FormFooterCreateBtn}
        onClick={handleClick(CONSTANTS.CREATE_MEMORY)}
      >
        SAVE IT
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleClick(CONSTANTS.RESET_INPUT)}
        fullWidth
        sx={sx.FormFooterResetBtn}
      >
        RESET
      </Button>
    </>
  );
};

FormFooter.propTypes = {
  isDisabledCreateBtn: PropTypes.bool,
  callbackHandler: PropTypes.func,
};

export default FormFooter;
