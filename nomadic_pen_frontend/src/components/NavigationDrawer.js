import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";

import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const isAuthenticated = () => {
  return localStorage.getItem("bearerToken") !== null;
};

const NavigationDrawer = ({ isDrawerOpen, toggleDrawer }) => {
  const loggedInItems = [
    {
      primary: "Logout",
      onClick: () => {
        localStorage.removeItem("bearerToken");
        window.location.href = "/login";
      },
    },
    {
      primary: "Profile",
      onClick: () => {
        window.location.href = "/profile";
      },
    },
    {
      primary: "Gallery",
      onClick: () => {
        window.location.href = "/gallery";
      },
    },
    {
      primary: "Create Post",
      onClick: () => {
        window.location.href = "/posts/create";
      },
    },
    {
      primary: "Discover",
      onClick: () => {
        window.location.href = "/posts/following";
      },
    },
    {
      primary: "Subscribe",
      onClick: () => {
        window.location.href = "/subscribe";
      },
    },
  ];

  const loggedOutItems = [
    {
      primary: "Login",
      onClick: () => {
        window.location.href = "/login";
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <StyledListItemButton
            onClick={() => {
              window.location.href = "/faq";
            }}
          >
            <StyledListItemText primary="FAQs" />
          </StyledListItemButton>
          <StyledListItemButton
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            <StyledListItemText primary="Contact Us" />
          </StyledListItemButton>
          <StyledListItemButton
            onClick={() => {
              window.location.href = "/travel-guide";
            }}
          >
            <StyledListItemText primary="Travel Guide" />
          </StyledListItemButton>

          {isAuthenticated()
            ? // Render the items when the user is logged in
              loggedInItems.map((item) => (
                <StyledListItemButton key={item.primary} onClick={item.onClick}>
                  <StyledListItemText primary={item.primary} />
                </StyledListItemButton>
              ))
            : // Render the items when the user is logged out
              loggedOutItems.map((item) => (
                <StyledListItemButton key={item.primary} onClick={item.onClick}>
                  <StyledListItemText primary={item.primary} />
                </StyledListItemButton>
              ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default NavigationDrawer;
