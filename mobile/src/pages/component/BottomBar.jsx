import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ButtonBase from "@mui/material/ButtonBase";
import MenuIcon from '@mui/icons-material/MenuOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonIcon from '@mui/icons-material/Person2Outlined';

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState("home"); // Estado inicial
  const navigate = useNavigate();

  const handleTabClick = (tab, route) => {
    setSelectedTab(tab); // Actualiza el estado del tab seleccionado
    navigate(route); // Navega a la ruta correspondiente
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        height: "8%",
        width: "100%",
        boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{width: '100%', padding:2
        }}>
          
          {/* Tab 1: Menú */}
          <Grid>
            <ButtonBase
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              onClick={() => handleTabClick('menu', '/menu')}
            >
              <MenuIcon sx={{ color: selectedTab === 'menu' ? "#D90036" : "#404040" }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 200,
                  fontSize: 12,
                  color: selectedTab === 'menu' ? "#D90036" : "#404040",
                  textAlign: "center",
                }}
              >
                Menú
              </Typography>
            </ButtonBase>
          </Grid>

          {/* Tab 2: Home */}
          <Grid>
            <ButtonBase
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              onClick={() => handleTabClick('home', '/home')}
            >
              <HomeIcon sx={{ color: selectedTab === 'home' ? "#D90036" : "#404040" }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 200,
                  fontSize: 12,
                  color: selectedTab === 'home' ? "#D90036" : "#404040",
                  textAlign: "center",
                }}
              >
                Home
              </Typography>
            </ButtonBase>
          </Grid>

          {/* Tab 3: Mis Cupones */}
          <Grid>
            <ButtonBase
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              onClick={() => handleTabClick('coupons', '/cupones')}
            >
              <LocalOfferIcon sx={{ color: selectedTab === 'coupons' ? "#D90036" : "#404040" }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 200,
                  fontSize: 12,
                  color: selectedTab === 'coupons' ? "#D90036" : "#404040",
                  textAlign: "center",
                }}
              >
                Mis Cupones
              </Typography>
            </ButtonBase>
          </Grid>

          {/* Tab 4: Perfil */}
          <Grid>
            <ButtonBase
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              onClick={() => handleTabClick('profile', '/perfil')}
            >
              <PersonIcon sx={{ color: selectedTab === 'profile' ? "#D90036" : "#404040" }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 200,
                  fontSize: 12,
                  color: selectedTab === 'profile' ? "#D90036" : "#404040",
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
  );
};

export default BottomBar;
