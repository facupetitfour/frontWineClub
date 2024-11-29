import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent"; // Icono %
import WineBarIcon from "@mui/icons-material/WineBar"; // Icono de botella de vino
import CelebrationIcon from "@mui/icons-material/Celebration"; // Icono de copas brindando
import { useEffect, useState } from "react";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL;
import { jwtDecode } from "jwt-decode";

const Perfil = () => {
  const [perfil, setPerfil] = useState([
    {
      name: "Nombre del Producto/ Cupón",
      redeemedDate: "13/13/1333",
      points: 150000,
    },
    {
      name: "Nombre del Producto/ Cupón",
      redeemedDate: "13/13/1333",
      points: 10000,
    },
    {
      name: "Nombre del Producto/ Cupón",
      redeemedDate: "13/13/1333",
      points: 1500,
    },
    {
      name: "Nombre del Producto/ Cupón",
      redeemedDate: "13/13/1333",
      points: 1500,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);
    console.log(sub);
    const getData = async () => {
      if (BACK_URL) {
        try {
          await axios
            .get(`${BACK_URL}users/${sub}/userProfile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setPerfil(response.data);
              console.log(response.data);
            });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log(`NO HAY URL: ${BACK_URL}`);
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ padding: 2, minHeight: "100vh", minWidth: "100%" }}>
      {/* Tarjeta superior */}
      <Card sx={{ marginBottom: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <WineBarIcon
              sx={{ fontSize: 40, color: "#D90036", marginRight: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Hola!
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {`${perfil.name} ${perfil.surname}`}
          </Typography>
          <Divider sx={{ borderColor: "#D90036", borderWidth: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <CelebrationIcon sx={{ fontSize: 40, color: "#D90036" }} />
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#000" }}>
              {perfil.points}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Lista de cupones */}
      {perfil.points_history && perfil.points_history.length > 0 ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 2,
            padding: 2,
          }}
        >
          <List disablePadding>
            {perfil.points_history.map((coupon, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom:
                    index !== perfil.length - 1 ? "1px dashed #D90036" : "none",
                  padding: "12px 0",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: "#D90036", width: 40, height: 40 }}
                  >
                    <PercentIcon sx={{ color: "#fff" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", fontSize: 14 }}
                    >
                      {coupon.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: "#888", fontSize: 12 }}
                    >
                      Canjeado el: {coupon.redeemedDate}
                    </Typography>
                  }
                  sx={{ marginRight: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#000",
                    whiteSpace: "nowrap",
                  }}
                >
                  {coupon.points.toLocaleString("en-US")}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
    </Box>
  );
};

export default Perfil;
