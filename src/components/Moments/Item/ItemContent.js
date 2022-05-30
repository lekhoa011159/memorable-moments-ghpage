import React from "react";
import {
  Typography,
  Box,
  CardContent,
  Skeleton,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import sx from "./styles";

const ItemContent = (props) => {
  const { title, content, isLoading, thumbnail, tags, itemId } = props;

  const renderMemoryThumbnail = () => {
    if (isLoading) {
      return (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />
      );
    }

    return (
      thumbnail !== "" && (
        <CardMedia component="img" height={200} image={thumbnail} />
      )
    );
  };

  const renderTags = () => {
    if (isLoading) {
      return (
        <Skeleton
          variant="text"
          animation="wave"
          width={200}
          height={20}
          sx={sx.Skeleton}
        />
      );
    }

    return (
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {tags.map((tag) => {
          if (tag !== "") return `#${tag} `;
          return "";
        })}
      </Typography>
    );
  };

  return (
    <CardActionArea>
      <Link to={isLoading ? `` : `/${itemId}`}>
        <Box
          sx={{
            display: "flex",
            m: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
          }}
        >
          {renderTags()}
        </Box>

        {renderMemoryThumbnail()}

        <CardContent sx={{ pt: 0 }}>
          {isLoading ? (
            <Skeleton
              variant="text"
              animation="wave"
              width={100}
              height={20}
              sx={sx.Skeleton}
            />
          ) : (
            <Typography
              variant="h5"
              sx={{ m: (theme) => `${theme.spacing(3)} 0` }}
            >
              {title}
            </Typography>
          )}
          <Box>
            {isLoading ? (
              <>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={280}
                  height={20}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={280}
                  height={20}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={200}
                  height={20}
                />
              </>
            ) : (
              <Typography variant="body1" sx={sx.CardContent}>
                {content}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Link>
    </CardActionArea>
  );
};

ItemContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callbackHandler: PropTypes.func,
  isLoading: PropTypes.bool,
  tags: PropTypes.array,
  thumbnail: PropTypes.string,
};

ItemContent.defaultProps = {
  title: "",
  content: "",
  tags: [""],
  thumbnail: "",
  id: "",
  callbackHandler: () => {},
  isLoading: true,
};

export default ItemContent;
