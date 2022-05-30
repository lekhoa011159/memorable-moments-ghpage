import React from "react";
import { Skeleton, Paper, Box } from "@mui/material";
import sx from "./styles";

const LoadingSkeleton = () => {
  return (
    <Paper elevation={24} sx={sx.PaperLoading}>
      <Skeleton
        variant="rectangular"
        width="70%"
        height={400}
        animation="wave"
      />
      <Box sx={{ p: (theme) => theme.spacing(2), width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          {/* Avatar */}
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
            sx={{ m: (theme) => theme.spacing(1) }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Author */}
            <Skeleton variant="text" width={80} height={25} animation="wave" />
            {/* Created At */}
            <Skeleton variant="text" width={100} height={20} animation="wave" />
          </Box>
        </Box>

        {/* Tags */}
        <Skeleton variant="text" width={180} height={20} animation="wave" />
        {/* Title */}
        <Skeleton variant="text" width={300} height={40} animation="wave" />
        {/* All Contents */}
        <Skeleton variant="text" width="95%" height={20} animation="wave" />
        <Skeleton variant="text" width="82%" height={20} animation="wave" />
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
        <Skeleton variant="text" width="87%" height={20} animation="wave" />
        <Skeleton variant="text" width="85%" height={20} animation="wave" />
        <Skeleton variant="text" width="84%" height={20} animation="wave" />
      </Box>
    </Paper>
  );
};

export default LoadingSkeleton;
