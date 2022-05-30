import { red } from "@mui/material/colors";

const sx = {
  CardHeader: {
    padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
    "& .MuiCardHeader-title": {
      fontWeight: 700,
    },
    "& .MuiCardHeader-avatar": {
      mr: (theme) => theme.spacing(1),
    },
  },

  CardHeaderAvatar: {
    backgroundColor: red[500],
  },

  CardContent: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
  },

  Skeleton: {
    mb: (theme) => theme.spacing(1),
  },
};

export default sx;
