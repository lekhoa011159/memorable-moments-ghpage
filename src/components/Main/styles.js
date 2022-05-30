const sx = {
  Chip: {
    mb: (theme) => theme.spacing(2),
    mr: (theme) => theme.spacing(2),
    "& .MuiChip-label": {
      fontWeight: 700,
    },
  },
  Pagination: {
    display: "flex",
    justifyContent: "center",
    mt: (theme) => theme.spacing(3),
  },

  Container: { marginTop: (theme) => theme.spacing(2), padding: 0 },
};

export default sx;
