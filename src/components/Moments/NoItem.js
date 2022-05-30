import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import FolderOffIcon from "@mui/icons-material/FolderOff";

const NoItem = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        alt="empty-item"
        height={200}
        src="https://cdn-icons-png.flaticon.com/512/869/869027.png"
      />
      <Typography
        sx={{ textAlign: "center", mt: (theme) => theme.spacing(2) }}
        variant="h4"
        color="secondary"
      >
        LOOK LIKE YOU DON'T HAVE ANY MEMORIES HERE, TRY CREATING ONE.
      </Typography>
      {/* <Button variant="contained" color="primary">
        Create your first Memory
      </Button> */}
    </Box>
  );
};

NoItem.propTypes = {};
NoItem.defaultProps = {};

export default NoItem;
