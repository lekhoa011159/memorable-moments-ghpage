import React, { useEffect } from "react";
import { Paper, Typography, Container, Grow, Box, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import moment from "moment";
import { getMemoryItem, getRecommendItem } from "../../actions/memory";
import RecommendMemory from "./Recommend";
import CONSTANTS from "./const";
import sx from "./styles";
import LoadingSkeleton from "./Loading";

const DetailsPage = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const selectedItem = useSelector((state) => state.memory.memoryItem);
  const isLoading = useSelector((state) => state.memory.loading);
  const listItems = useSelector((state) => state.memory.recommendItems);
  const fallbackImg =
    "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";

  useEffect(() => {
    dispatch(getMemoryItem(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    props.toggleSearchbarShow(false);
  }, [props]);

  useEffect(() => {
    (async () => {
      if (selectedItem) {
        dispatch(getRecommendItem(selectedItem));
      }
    })();
  }, [dispatch, selectedItem]);

  const renderThumbnail = () => {
    return (
      <Box sx={sx.Thumbnail}>
        <img
          src={thumbnail === "" ? fallbackImg : thumbnail}
          alt="thumbnail-item"
        />
      </Box>
    );
  };

  const renderContent = () => {
    return (
      <Box sx={{ width: "55%", pl: (theme) => theme.spacing(2) }}>
        <Box sx={{ mb: (theme) => theme.spacing(2), display: "flex" }}>
          <Avatar sx={sx.Avatar}>{author.substring(0, 2)}</Avatar>
          <Box>
            <Typography variant="h6">{author}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {moment(createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography gutterBottom variant="h4">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2">
          {content}
        </Typography>
      </Box>
    );
  };

  const callbackHandler = (actionType, value) => {
    switch (actionType) {
      case CONSTANTS.GET_RECOMMEND_ITEMS:
        // handleGetCommendItems();
        break;
      default:
        console.log(
          `callbackHandler with default case: ${actionType}, value: ${value}`
        );
        return;
    }
  };

  if (!selectedItem && !isLoading) {
    return <div>No item</div>;
  }

  if (!selectedItem && isLoading) {
    // if (!isLoading || isLoading) {
    return <LoadingSkeleton />;
  }

  const { thumbnail, title, author, content, createdAt, tags } = selectedItem;

  return (
    <Grow in>
      <Container sx={sx.Container}>
        <Paper
          elevation={24}
          sx={{
            borderRadius: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: (theme) => theme.spacing(1.5),
            }}
          >
            {renderThumbnail()}
            {renderContent()}
          </Box>

          {listItems && listItems.length > 0 && (
            <RecommendMemory
              isLoading={isLoading}
              recommendItems={listItems}
              callbackHandler={callbackHandler}
              fallbackImg={fallbackImg}
            />
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

DetailsPage.propTypes = {};

DetailsPage.defaultProps = {};

export default DetailsPage;
