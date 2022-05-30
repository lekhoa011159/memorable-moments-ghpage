import React from "react";
import {
  CardHeader,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import PropTypes from "prop-types";
import CONSTANTS from "../const";

import sx from "./styles";

const ItemHeader = (props) => {
  const {
    callbackHandler,
    id,
    author,
    createdAt,
    anchorEl,
    isMenuOpen,
    isLoading,
  } = props;

  const getAvatarCharacter = () => {
    return author.substring(0, 2);
  };

  const handleClickMenu = (actionType) => (e) => {
    if (actionType === "open") {
      callbackHandler(CONSTANTS.CLICKED_POPUP_MENU, e.currentTarget);
    } else {
      callbackHandler(CONSTANTS.CLICKED_POPUP_MENU, null);
    }
  };

  const handleClickItem = (e) => {
    const actionType = e.target.getAttribute("data-action");
    callbackHandler(actionType, id);
    callbackHandler(CONSTANTS.CLICKED_POPUP_MENU, null);
  };

  const renderMoreMenuButton = () => {
    if (!isLoading)
      return (
        <Box>
          <IconButton onClick={handleClickMenu("open")}>
            <MoreHorizIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleClickMenu("close")}
          >
            <MenuItem
              onClick={handleClickItem}
              data-action={CONSTANTS.EDIT_MEMORY}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={handleClickItem}
              data-action={CONSTANTS.DELETE_MEMORY}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      );
  };

  const renderSubHeader = (timestamp) => {
    if (isLoading)
      return (
        <Skeleton variant="text" width="50%" height={20} animation="wave" />
      );

    return (
      <Typography variant="body2" color="text.secondary">
        {moment(timestamp).fromNow()}
      </Typography>
    );
  };

  const renderAuthor = (author) => {
    if (isLoading)
      return (
        <Skeleton variant="text" width={50} height={20} animation="wave" />
      );

    return <Typography variant="body1">{author}</Typography>;
  };

  return (
    <>
      <CardHeader
        avatar={
          isLoading ? (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
          ) : (
            <Avatar sx={sx.CardHeaderAvatar}>{getAvatarCharacter()}</Avatar>
          )
        }
        action={renderMoreMenuButton(id)}
        title={renderAuthor(author)}
        subheader={renderSubHeader(createdAt)}
        sx={sx.CardHeader}
      />
    </>
  );
};

ItemHeader.propTypes = {
  callbackHandler: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  author: PropTypes.string,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  anchorEl: PropTypes.object || null,
  isMenuOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ItemHeader.defaultProps = {
  callbackHandler: () => {},
  id: "",
  author: "",
  createdAt: "",
  anchorEl: null,
  isMenuOpen: false,
  isLoading: true,
};

export default ItemHeader;
