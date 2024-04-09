import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Stack, Toolbar, Grid } from "@mui/material";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import CenterDisplay from "./CenterDisplay";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import UseReponsive from "../hooks/UseResponsive";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import Profile from "../assets/profile.jpg"

function AccountMenu({ role }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutClick, setLogoutClick] = useState(false);
  const open = Boolean(anchorEl);

  let Navigate = useNavigate();

  const onLogoutClick = () => {
    setLogoutClick(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
          <Avatar src={Profile} sx={{ width: 32, height: 32 }}/>
        </IconButton>
      </Tooltip>
      {anchorEl ? (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
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
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            px={7}
            py={1.5}
          >
            <Avatar style={{ width: "60px", height: "60px" }} src={Profile}/>
            <Typography fontWeight={"bold"} mt={1} >
              {role === "Admin"
                ? "Pratiksha Nimbalkar"
                : role === "Manager"
                ? "Trupti Jadhav"
                : " Pruthviraj Suryavanshi"}
            </Typography>
            <Typography variant="subTitle">
              {role === "Admin"
                ? "Admin"
                : role === "Manager"
                ? "Project Manager"
                : "Developer"}
            </Typography>
            <Box display={"flex"} gap={0.5} mt={1} flexDirection={"row"}>
              <MailIcon />
              <Typography color="textSecondary">
                {role === "Admin"
                  ? "pratiksha@gmail.com"
                  : role === "Manager"
                  ? "trupti@gmail.com"
                  : "pruthvi@gmail.com"}
              </Typography>
            </Box>
            <Box item display="flex">
              <CallIcon />
              <Typography color="textSecondary">+91 8356789870</Typography>
            </Box>
            <MenuItem
              onClick={() => onLogoutClick()}
              disableRipple
              sx={{ mt: 3,color:"red"}}
            >
                <Logout fontSize="small" sx={{ color: 'red' ,mr:1}}/>
              Logout
            </MenuItem>
          </Box>
        </Menu>
      ) : (
        logoutClick && Navigate("/")
      )}
    </Box>
  );
}

const drawerWidth = 240;

export default function Display({ logedInUser, role }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const responsive = UseReponsive();

  console.log(role);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "whitesmoke", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "primary",
        }}
      >
        <Stack direction={"row"} m={1.5} justifyContent={"space-between"}>
          <Stack>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1.5, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            height={"100%"}
            alignItems={"center"}
          >
            {responsive.isDesktop ||
            responsive.isLaptop ||
            responsive.isTablet ? (
              <Typography variant="h6" noWrap component="div">
                {role === "Admin"
                  ? "Pratiksha Nimbalkar"
                  : role === "Manager"
                  ? "Trupti Jadhav"
                  : " Pruthviraj Suryavanshi"}
              </Typography>
            ) : (
              <></>
            )}
            <AccountMenu  role={role} />
          </Stack>
        </Stack>
      </AppBar>
      <Box
        // component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer role={role} handleDrawerClose={handleDrawerClose} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideDrawer role={role} />
        </Drawer>
      </Box>
      <Grid container direction={"row"}>
        <Toolbar />
        <Box bgcolor={"#f5f5f5"} sx={{ width: "100%", height: "89.7vh" }}>
          <CenterDisplay role={role} />
        </Box>
      </Grid>
    </Box>
  );
}
