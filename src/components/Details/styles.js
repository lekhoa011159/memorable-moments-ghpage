import { red } from "@mui/material/colors";

const sx = {
  Container: {
    marginTop: (theme) => theme.spacing(3),
    padding: `${0} !important`,
    justifyContent: "center",
  },
  CardContent: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
  },
  Thumbnail: {
    width: "45%",
    "& img": {
      width: "100%",
      display: "block",
      borderRadius: 5,
    },
  },
  Avatar: {
    backgroundColor: red[500],
    marginTop: (theme) => theme.spacing(0.5),
    marginRight: (theme) => theme.spacing(1),
  },
  PaperLoading: {
    borderRadius: 5,
    mt: (theme) => theme.spacing(1.5),
    display: "flex",
  },
};

export default sx;
