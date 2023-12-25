/* Author: Meet Sinojia */

import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

import * as constants from "../../constants";

const useStyles = makeStyles((theme) => ({
  unread: {
    fontWeight: 800,
    backgroundColor: "#e5e3ff",
  },
}));

const notificationKinds = {
  LIKE: "LIKE",
  COMMENT: "COMMENT",
  FOLLOW: "FOLLOW",
  SCHEDULED_POST: "SCHEDULED_POST",
};

const NotificationItem = ({ notification }) => {
  const classes = useStyles();

  const handleClick = () => {
    axios.put(`${constants.BACKEND_URL}/notifications/${notification._id}/mark-read`);
    if (
      notification.kind === notificationKinds.LIKE ||
      notification.kind === notificationKinds.COMMENT ||
      notification.kind === notificationKinds.SCHEDULED_POST
    ) {
      window.location.href = `/posts/${notification.postId}`;
    }
  };

  const getNotificationText = () => {
    switch (notification.kind) {
      case notificationKinds.LIKE:
        return `${notification.actionUser.firstName} ${notification.actionUser.lastName} liked your post.`;
      case notificationKinds.COMMENT:
        return `${notification.actionUser.firstName} ${notification.actionUser.lastName} commented on your post.`;
      case notificationKinds.FOLLOW:
        return `${notification.actionUser.firstName} ${notification.actionUser.lastName} followed you.`;
      case notificationKinds.SCHEDULED_POST:
        return `Your scheduled post has been published.`;
      default:
        return "";
    }
  };

  return (
    <List
      className={notification.read ? "" : classes.unread}
      component="ul"
      sx={{ width: "100%" }}
    >
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            alt={`${notification.actionUser.firstName} ${notification.actionUser.lastName}`}
            src={notification.actionUser.profilePic}
          ></Avatar>{" "}
        </ListItemAvatar>

        <ListItemText>
          <Typography
            variant="bolder"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              display: "inline-block",
            }}
          >
            {getNotificationText()}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </List>
  );
};

export default NotificationItem;
