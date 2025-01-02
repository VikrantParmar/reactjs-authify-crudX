import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommonHelper from "@/utils/commonHelpers";
import { logout, resetError } from "@/store/auth/authSlice";

const pages = [
  { name: "Home", path: "/", public: 1, auth: 1 },
  { name: "Article", path: "/article", public: 1, auth: 1 },
  { name: "Login", path: "/login", public: 1, auth: 0 },
  { name: "SignUp", path: "/register", public: 1, auth: 0 },
];

function HeaderMenu() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(page.path);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  const handleOpenUserMenu = () => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleClose();
    dispatch(logout())
      .unwrap()
      .then((response) => {
        navigate("/home", {
          replace: true,
        });
      })
      .catch((error) => {});
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            className="desktop-only"
            style={{
              display: "flex",
              textDecoration: "none",
            }}
          >
            <img
              src={"/react.svg"}
              className="header-logo"
              alt={`${import.meta.env.VITE_APP_NAME} logo`}
              sx={{ display: { xs: "none", md: "flex" } }}
            />

            <Typography
              variant="h6"
              noWrap
              component="span" //a //href="#"
              className="header-app-name"
              sx={{
                marginLeft: "8px",
                display: { xs: "none", md: "flex" },
              }}
            >
              {import.meta.env.VITE_APP_NAME}
            </Typography>
          </Link>
          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleCloseNavMenu}
              sx={{ width: 250 }}
            >
              <Box onClick={handleCloseNavMenu}>
                <Box
                  className="bg-primary text-secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 250,
                    padding: 1,
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={"/react.svg"}
                    alt={`${import.meta.env.VITE_APP_NAME} logo`}
                    className="header-logo"
                    sx={{
                      width: 40,
                      height: 40,
                      marginRight: 1,
                    }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#"
                    className="header-app-name text-primary"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {import.meta.env.VITE_APP_NAME}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  className="bg-secondary2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 1,
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  <List>
                    {pages.map((page) => (
                      <ListItem
                        key={page.name}
                        disablePadding
                        className={`menu-mobile-item ${
                          location.pathname === page.path ? "active" : ""
                        }`}
                        onClick={() => handleNavigation(page)}
                      >
                        <ListItemButton sx={{ textAlign: "center" }}>
                          <ListItemText primary={page.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Drawer>
          </Box>
          <Box
            component="img"
            src={"/react.svg"}
            alt={`${import.meta.env.VITE_APP_NAME} logo`}
            className="header-logo"
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none" },
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            className="header-app-name"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            {import.meta.env.VITE_APP_NAME}
          </Typography>
          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              textAlign: "center",
            }}
            className="menu"
          >
            {pages.map((page, index) => {
              if (
                (isLoggedIn && page.auth === 1) ||
                (!isLoggedIn && page.public === 1)
              ) {
                return (
                  <Button
                    key={index}
                    className={`menu-item ${
                      location.pathname === page.path ? "active" : ""
                    }`}
                    onClick={() => handleNavigation(page)}
                    sx={{ my: 2, mr: 1, display: "block" }}
                  >
                    {page.name}
                  </Button>
                );
              }
              return null;
            })}
          </Box>
          {isLoggedIn && user ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        color: "primary.main",
                        background: "secondary.main",
                      }}
                    >
                      {CommonHelper._nameInitials(user.full_name)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                //onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <strong>
                    Hello, {user.full_name} [{user.unique_id}]
                  </strong>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box
              sx={{
                width: 40,
                height: 40,
                ml: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderMenu;