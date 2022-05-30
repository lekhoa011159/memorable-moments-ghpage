import React, { useState } from "react";
import { Grid, Card } from "@mui/material";
import PropTypes from "prop-types";

import ItemHeader from "./ItemHeader";
import ItemContent from "./ItemContent";
// import ItemFooter from "./ItemFooter";
import CONSTANTS from "../const";

const MomentItem = (props) => {
  const { callbackHandler, item, isLoading } = props;
  const {
    _id: id,
    author,
    createdAt,
    thumbnail,
    title,
    content,
    // likes,
    tags,
  } = item;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const CALLBACK_HANDLER = (actionType, value) => {
    switch (actionType) {
      case CONSTANTS.CLICKED_POPUP_MENU:
        setAnchorEl(value);
        break;
      default:
        setAnchorEl(null);
        callbackHandler(actionType, value);
    }
  };

  return (
    <Grid item xs={6} key={id}>
      <Card sx={{ wordBreak: "break-word" }}>
        <ItemHeader
          isLoading={isLoading}
          isMenuOpen={open}
          anchorEl={anchorEl}
          id={id}
          author={author}
          createdAt={createdAt}
          callbackHandler={CALLBACK_HANDLER}
        />
        <ItemContent
          isLoading={isLoading}
          itemId={id}
          content={content}
          title={title}
          thumbnail={thumbnail}
          tags={tags}
        />
        {/* <ItemFooter
          id={id}
          isLoading={isLoading}
          callbackHandler={CALLBACK_HANDLER}
          likes={likes}
        /> */}
      </Card>
    </Grid>
  );
};

MomentItem.propTypes = {
  callbackHandler: PropTypes.func,
  item: PropTypes.object,
  isLoading: PropTypes.bool,
};

MomentItem.defaultProps = {
  callbackHandler: () => {},
  isLoading: true,
};

export default MomentItem;
