import React from "react";
import {
  Divider,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import sx from "./styles";

const RecommendMemory = (props) => {
  const { recommendItems, isLoading, fallbackImg } = props;
  const navigate = useNavigate();

  const handleNavigateItem = (navigatedId) => {
    navigate(`/${navigatedId}`, { replace: true });
  };

  const renderItem = (item) => {
    if (item) {
      const { thumbnail, _id: id, tags, title, content } = item;
      return (
        <Grid key={id} item xs={5} sx={{ m: (theme) => theme.spacing(2) }}>
          <Card>
            <CardActionArea onClick={() => handleNavigateItem(id)}>
              <CardMedia
                component="img"
                height="140"
                image={thumbnail === "" ? fallbackImg : thumbnail}
                alt={`postThumbnail-${id}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {tags.map((tag) => `#${tag} `)}
                </Typography>
                <Typography variant="h5">{title}</Typography>
                <Typography
                  sx={sx.CardContent}
                  variant="body2"
                  color="text.secondary"
                >
                  {content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    }
  };

  return (
    <Box
      sx={{ mt: (theme) => theme.spacing(4), p: (theme) => theme.spacing(2) }}
    >
      <Typography gutterBottom variant="h6">
        You might also like:
      </Typography>
      <Divider variant="middle" />
      <Grid container columns={24}>
        {recommendItems &&
          recommendItems.length > 0 &&
          recommendItems.map((item) => renderItem(item))}
      </Grid>
    </Box>
  );
};

RecommendMemory.propTypes = {
  callbackHandler: PropTypes.func,
  recommendItems: PropTypes.array,
  isLoading: PropTypes.bool,
};

RecommendMemory.defaultProps = {
  callbackHandler: () => {},
  recommendItems: [],
  isLoading: true,
};

export default RecommendMemory;
