import React from "react";
import { CardActions, Typography, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PropTypes from "prop-types";

import CONSTANTS from "../const";

const ItemFooter = (props) => {
  const { id, likes, callbackHandler, isLoading } = props;

  const handleLikedMemory = () => {
    callbackHandler(CONSTANTS.LIKE_MEMORY, id);
  };

  if (!isLoading)
    return (
      <CardActions disableSpacing>
        {/* <IconButton sx={{ fontSize: "1rem" }} onClick={handleLikedMemory}>
          <ThumbUpOutlinedIcon sx={{ mr: (theme) => theme.spacing(1) }} />
          <Typography variant="body1">{likes}</Typography>
        </IconButton> */}
      </CardActions>
    );
};

ItemFooter.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callbackHandler: PropTypes.func,
  likes: PropTypes.number,
  isLoading: PropTypes.bool,
};

ItemFooter.defaultProps = {
  id: "",
  callbackHandler: () => {},
  likes: 0,
  isLoading: true,
};

export default ItemFooter;
