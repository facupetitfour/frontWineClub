import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import EggIcon from "@mui/icons-material/Egg";
import AvaliableUserIcon from "@mui/icons-material/VerifiedUser";
import UserIcon from "@mui/icons-material/SupervisedUserCircle";
import ProductsIcon from '@mui/icons-material/Inventory';
import CuponesIcon from '@mui/icons-material/Discount';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "./MenuAccount";
import {useNavigate, Outlet} from "react-router-dom";

const drawerWidth = 240;
const drawerheight = 100;

const SideBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const listDrawerItem = {
    home: {link: "/", text: "Home",icon: <HomeIcon/>  },
    users: {link: "/users", text: "Usuarios",icon: <UserIcon/>},
    products: {link: "/products", text: "Productos",icon: <ProductsIcon/>},
    coupons: {link: "/coupons", text: "Cupones",icon: <CuponesIcon/>},
    avaiable: {link: "/avaiable", text:"Habilitados",icon: <AvaliableUserIcon/>},
  };
  const visibleFields = Object.keys(listDrawerItem);
  const navigate = useNavigate();
  
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
  const drawer = (
    <div>
      <Toolbar/>
      <Divider />
      <List>
        {visibleFields.map((field) => (
          <ListItem key={field} disablePadding>              
            <ListItemButton onClick={()=>{navigate(listDrawerItem[field].link)}}>
              <ListItemIcon>
                { listDrawerItem[field].icon?  listDrawerItem[field].icon: <EggIcon/>}
              </ListItemIcon>
              <ListItemText primary={listDrawerItem[field].text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            WINE CLUB
          </Typography>
          <NavBar />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection:"column",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          paddingTop:`${drawerheight}px`
        }}
      >
        <Outlet/>
      </Box>
    </Box>
  );
};

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;
