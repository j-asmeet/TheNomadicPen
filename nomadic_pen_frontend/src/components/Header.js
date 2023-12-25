import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import NavigationDrawer from "./NavigationDrawer";
import NotificationsMenu from "./Notifications/NotificationsMenu";

function landing() {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
}

function contact() {
  window.location.href = "/contact";
}

function faq() {
  window.location.href = "/faq";
}

function profile() {
  window.location.href = "/profile";
}
function gallery() {
    window.location.href = "/gallery";
}
function userLogin() {
  window.location.href = "/login";
}

const Header = () => {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail]=useState('');

  useEffect(() => {
    const bearerToken = localStorage.getItem("bearerToken");
    setIsAuthenticated(!!bearerToken);
    setUserEmail(localStorage.getItem('email'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bearerToken");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        {/* Hamburger Icon - Visible on smaller screens */}
        {isSmallerScreen && (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Branding */}
        <button
          style={{
            background: "none",
            border: "none",
            padding: "0",
            cursor: "pointer",
          }}
          onClick={landing}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "inline-block",
              border: "2px solid #E3DFFD",
              borderRadius: "5px",
              padding: "4px 8px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              backgroundColor: "black",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                fontSize: "24px",
                color: "#FFFFFF",
              }}
            >
              <span style={{ color: "#BFACE2" }}>The</span>
              <span style={{ color: "#E3DFFD" }}>Nomadic</span>
              <span style={{ color: "#BFACE2" }}>Pen</span>
            </Typography>
          </Box>
        </button>

        {/* Search */}
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          {/* <Grid item xs={12} sm={6} md={4}>
                    <SearchBar
                      variant="outlined"
                      placeholder="Search"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid> */}
        </Grid>

        {isSmallerScreen && <NotificationsMenu />}

        {/* Navigation Options - Visible on larger screens */}
        {!isSmallerScreen && (
          <>
            <IconButton
              color="inherit"
              onClick={() => {
                window.location.href = "/travel-guide";
              }}
            >
              Travel Guide
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                contact();
              }}
            >
              Contact Us
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                faq();
              }}
            >
              FAQs
            </IconButton>
            {isAuthenticated ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    window.location.href = "/subscribe";
                  }}
                >
                  Subscribe
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    window.location.href = "/posts/following";
                  }}
                >
                  Discover
                </IconButton>
                <IconButton
                      color="inherit"
                      onClick={() => {
                          gallery();
                      }}
                >
                      Gallery
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    window.location.href = "/posts/create";
                  }}
                >
                  Create Post
                </IconButton>
                {isAuthenticated && userEmail === "jasmeetsingh23596@gmail.com" && (
              <IconButton
                color="inherit"
                onClick={() => {
                  window.location.href = "/stats";
                }}
              >
                Admin
              </IconButton>
            )}
                <IconButton
                  color="inherit"
                  onClick={() => {
                    profile();
                  }}
                >
                  Profile
                </IconButton>
                <NotificationsMenu />
                <IconButton
                  color="inherit"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </IconButton>
              </>
            ) : (
              <IconButton
                color="inherit"
                onClick={() => {
                  userLogin();
                }}
              >
                Login
              </IconButton>
            )}
          </>
        )}
      </Toolbar>

      {/* Drawer - Visible on smaller screens */}
      <NavigationDrawer
        anchor="left"
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      ></NavigationDrawer>
    </AppBar>
  );
};

export default Header;
