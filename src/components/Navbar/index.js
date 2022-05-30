import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Button,
  Box,
  ThemeProvider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import sx, { theme } from "./styles";
import ModalSearch from "./ModalSearch";
import CONSTANTS from "./consts";
import { getAll } from "../../actions/memories";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogToggle] = useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleBindingSearchHotkey);

    return () => {
      document.removeEventListener("keydown", handleBindingSearchHotkey);
    };
  }, []);

  const handleBindingSearchHotkey = (evt) => {
    if ((evt.key === "k" || evt.key === "K") && evt.ctrlKey) {
      evt.preventDefault();
      evt.stopPropagation();
      setDialogToggle(true);
    }
  };

  const handleClickSetting = () => {
    console.log("setting");
  };

  const handleUserLogin = () => {
    console.log("Login");
  };

  const handleCloseDialog = () => {
    setDialogToggle(false);
  };

  const showDialogSearch = () => {
    setDialogToggle(true);
  };

  const handleConfirmSearch = (search) => {
    try {
      dispatch(getAll(search));
      props.onChangeSearch(search);
      setDialogToggle(false);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const callbackHandler = (actionType, value) => {
    switch (actionType) {
      case CONSTANTS.CHANGE_TEXT_SEARCH:
        props.onChangeSearch(value);
        break;
      case CONSTANTS.CLOSE_DIALOG:
        handleCloseDialog();
        break;
      case CONSTANTS.CONFIRM_SEARCH:
        handleConfirmSearch(value);
        break;
      default:
        console.log(
          `Default case: actionType - ${actionType}, value - ${value}`
        );
        return;
    }
  };

  const renderLeftsideNavbar = () => {
    return (
      <Grid item xs={8}>
        <Grid container alignItems="center">
          <Link style={{ marginLeft: 24 }} to="/memorable-moments-ghpage">
            {/* For self-custom logo */}
            <img height={80} src="https://i.imgur.com/vSUWiWd.png" alt="Logo" />
          </Link>
        </Grid>
      </Grid>
    );
  };

  const renderRightsideNavbar = () => {
    return (
      <Grid item xs={4} sx={{ alignSelf: "center" }}>
        <Grid container justifyContent="space-evenly" alignItems="center">
          {props.isSearchbarShow && (
            <Button
              color="secondary"
              variant="outlined"
              size="large"
              onClick={showDialogSearch}
              sx={sx.SearchButton}
            >
              <Box sx={sx.SearchPlaceholder}>
                <SearchIcon />
                <Typography variant="body2">Search...</Typography>
              </Box>
              <div id="hotkey-search">Ctrl + K</div>
            </Button>
          )}

          {/* <IconButton sx={sx.Icon
          Button} onClick={handleUserLogin}>
            <Avatar alt="fallbackImg" sx={{ width: 24, height: 24 }} />
          </IconButton> */}
          {/* <IconButton
            size="small"
            sx={sx.IconButton}
            onClick={handleClickSetting}
          >
            <SettingsIcon />
          </IconButton> */}
        </Grid>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div onKeyUp={handleBindingSearchHotkey}>
        <AppBar color="secondary" position="static" sx={{ borderRadius: 2 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid container columns={12}>
                {renderLeftsideNavbar()}
                {renderRightsideNavbar()}
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <ModalSearch callbackHandler={callbackHandler} isOpen={dialogOpen} />
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
