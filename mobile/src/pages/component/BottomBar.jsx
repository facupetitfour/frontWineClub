"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import ButtonBase from "@mui/material/ButtonBase"
import MenuIcon from "@mui/icons-material/MenuOutlined"
import HomeIcon from "@mui/icons-material/HomeOutlined"
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined"
import PersonIcon from "@mui/icons-material/Person2Outlined"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { Box, Drawer, List, Divider, Avatar, useMediaQuery, useTheme } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import StorefrontIcon from "@mui/icons-material/Storefront"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import WineBarIcon from "@mui/icons-material/WineBar"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState("home")
  const [stateSideMenu, setStateSideMenu] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleTabClick = (tab, route) => {
    setSelectedTab(tab)
    navigate(route)
  }

  const toggleDrawer = (state) => {
    setStateSideMenu(state)
  }

  const logout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("access_token")

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/")
  }

  const optionsDrawer = [
    { title: "Productos", route: "/allproducts", icon: <StorefrontIcon /> },
    { title: "Cupones", route: "/allcoupons", icon: <LocalOfferIcon /> },
    { title: "Favoritos", route: "/favorite", icon: <FavoriteBorderIcon /> },
    { title: "Mis Canjes", route: "/mycoupons", icon: <LocalOfferIcon /> },
    { title: "Bodegas", route: "/allbodegas", icon: <WineBarIcon /> },
    { title: "Mi Perfil", route: "/myperfil", icon: <PersonIcon /> },
    { title: "Soporte", route: "/support", icon: <SupportAgentIcon /> },
  ]

  const DrawerList = (
    <Box
      sx={{
        width: isMobile ? 250 : 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      {/* Encabezado del Sidebar */}
      <Box
        sx={{
          backgroundColor: "#4A154B",
          color: "#FFF",
          padding: 2.5,
          textAlign: "center",
          width: "101%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          borderRight: "none", // Asegurar que no haya borde derecho
          borderTop: "none", // Asegurar que no haya borde superior
          borderLeft: "none", // Asegurar que no haya borde izquierdo
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            backgroundColor: "#FFFFFF",
            color: "#4A154B",
          }}
        >
          <WineBarIcon sx={{ fontSize: 28 }} />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Facundo Petitfour
        </Typography>
      </Box>

      <Divider />

      {/* Lista de opciones principal */}
      <List sx={{ flex: 1, padding: 0 }}>
        {optionsDrawer.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(option.route)
                toggleDrawer(false)
              }}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: "rgba(74, 21, 75, 0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ color: option.route === `/my${option.route}` ? "#D90036" : "inherit" }}>
                {option.icon}
              </ListItemIcon>
              <ListItemText
                primary={option.title}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: option.route === `/my${option.route}` ? 500 : 400,
                    color: option.route === `/my${option.route}` ? "#D90036" : "inherit",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Botón de Cerrar Sesión */}
      <Box sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={logout}
            sx={{
              py: 1.5,
              "&:hover": {
                backgroundColor: "rgba(217, 0, 54, 0.04)",
              },
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "#D90036" }} />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar Sesión"
              primaryTypographyProps={{
                sx: { color: "#D90036" },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          height: "64px",
          width: "100%",
          boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Drawer
          anchor="left"
          open={stateSideMenu}
          onClose={() => toggleDrawer(false)}
          PaperProps={{
            sx: {
              borderRadius: "0 8px 8px 0",
              boxShadow:
                "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
              border: "none", // Añadir esta línea para eliminar el borde
            },
          }}
        >
          {DrawerList}
        </Drawer>
        <Toolbar sx={{ height: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ width: "100%", padding: 0 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "8px 0",
                }}
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon
                  sx={{
                    color: selectedTab === "menu" ? "#D90036" : "#404040",
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 12,
                    color: selectedTab === "menu" ? "#D90036" : "#404040",
                    textAlign: "center",
                    marginTop: "2px",
                  }}
                >
                  Menú
                </Typography>
              </ButtonBase>
            </Grid>

            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "8px 0",
                }}
                onClick={() => handleTabClick("home", "/home")}
              >
                <HomeIcon
                  sx={{
                    color: selectedTab === "home" ? "#D90036" : "#404040",
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 12,
                    color: selectedTab === "home" ? "#D90036" : "#404040",
                    textAlign: "center",
                    marginTop: "2px",
                  }}
                >
                  Home
                </Typography>
              </ButtonBase>
            </Grid>

            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "8px 0",
                }}
                onClick={() => handleTabClick("coupons", "/mycoupons")}
              >
                <LocalOfferIcon
                  sx={{
                    color: selectedTab === "coupons" ? "#D90036" : "#404040",
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 12,
                    color: selectedTab === "coupons" ? "#D90036" : "#404040",
                    textAlign: "center",
                    marginTop: "2px",
                  }}
                >
                  Mis Canjes
                </Typography>
              </ButtonBase>
            </Grid>

            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <ButtonBase
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "8px 0",
                }}
                onClick={() => handleTabClick("profile", "/perfil")}
              >
                <PersonIcon
                  sx={{
                    color: selectedTab === "profile" ? "#D90036" : "#404040",
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 12,
                    color: selectedTab === "profile" ? "#D90036" : "#404040",
                    textAlign: "center",
                    marginTop: "2px",
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
  )
}

export default BottomBar

