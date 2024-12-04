import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import PersonIcon from "@mui/icons-material/Person2Outlined";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Drawer, List, Divider, Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WineBarIcon from "@mui/icons-material/WineBar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [stateSideMenu, setStateSideMenu] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab, route) => {
    setSelectedTab(tab);
    navigate(route);
  };

  const toggleDrawer = (state) => {
    setStateSideMenu(state);
  };

  const logout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("access_token");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };
  const optionsDrawer = [
    { title: "Productos", route: "/allproducts", icon: <StorefrontIcon /> },
    { title: "Cupones", route: "/allcoupons", icon: <LocalOfferIcon /> },
    { title: "Favoritos", route: "/favorite", icon: <FavoriteBorderIcon /> },
    { title: "Mis cupones", route: "/mycoupons", icon: <LocalOfferIcon /> },
    { title: "Bodegas", route: "/allbodegas", icon: <WineBarIcon /> },
    { title: "Soporte", route: "/support", icon: <SupportAgentIcon /> },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      {/* Encabezado del Sidebar */}
      <Box
        sx={{
          backgroundColor: "#4A154B",
          color: "#FFF",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            color: "#4A154B",
          }}
        >
          <WineBarIcon />
        </Avatar>
        <Typography variant="h6">Facundo Petitfour</Typography>
      </Box>

      <Divider />

      <List sx={{ bottom: 0 }}>
        {optionsDrawer.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(option.route)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Botón de Cerrar Sesión */}
      <ListItem disablePadding>
        <ListItemButton onClick={() => (logout())}>
          <ListItemIcon>
            <ExitToAppIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <>
      <Drawer open={stateSideMenu} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          height: "8%",
          width: "100%",
          boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%", padding: 2 }}
          >
            <Grid>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon
                  sx={{ color: selectedTab === "menu" ? "#D90036" : "#404040" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 200,
                    fontSize: 12,
                    color: selectedTab === "menu" ? "#D90036" : "#404040",
                    textAlign: "center",
                  }}
                >
                  Menú
                </Typography>
              </ButtonBase>
            </Grid>

            <Grid>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => handleTabClick("home", "/home")}
              >
                <HomeIcon
                  sx={{ color: selectedTab === "home" ? "#D90036" : "#404040" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 200,
                    fontSize: 12,
                    color: selectedTab === "home" ? "#D90036" : "#404040",
                    textAlign: "center",
                  }}
                >
                  Home
                </Typography>
              </ButtonBase>
            </Grid>

            <Grid>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => handleTabClick("coupons", "/mycoupons")}
              >
                <LocalOfferIcon
                  sx={{
                    color: selectedTab === "coupons" ? "#D90036" : "#404040",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 200,
                    fontSize: 12,
                    color: selectedTab === "coupons" ? "#D90036" : "#404040",
                    textAlign: "center",
                  }}
                >
                  Mis Cupones
                </Typography>
              </ButtonBase>
            </Grid>

            <Grid>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => handleTabClick("profile", "/perfil")}
              >
                <PersonIcon
                  sx={{
                    color: selectedTab === "profile" ? "#D90036" : "#404040",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 200,
                    fontSize: 12,
                    color: selectedTab === "profile" ? "#D90036" : "#404040",
                    textAlign: "center",
                  }}
                >
                  Perfil
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default BottomBar;
