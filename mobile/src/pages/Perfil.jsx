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
  Skeleton,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import WineBarIcon from "@mui/icons-material/WineBar";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useEffect, useState } from "react";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL;
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [perfil, setPerfil] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);
    const getData = async () => {
      if (BACK_URL) {
        try {
          const response = await axios.get(`${BACK_URL}users/${sub}/userProfile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.data.profile) {
            navigate("/registerPerfil");
          }
          // console.log("PERFIL: ", response.data.profile);
          setPerfil(response.data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        // console.log(`NO HAY URL: ${BACK_URL}`);
        setLoading(false);
      }
    };
    getData();
  }, [navigate]);

  return (
    <Box sx={{ padding: 2, minWidth: "100%" }}>
      <Card sx={{ marginBottom: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <WineBarIcon sx={{ fontSize: 40, color: "#D90036", marginRight: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Hola!
            </Typography>
          </Box>

          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={40} />
              <Divider sx={{ borderColor: "#D90036", borderWidth: 1, my: 2 }} />
              <Skeleton variant="text" width={100} height={40} />
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                {`${perfil.profile.name} ${perfil.profile.surname}`}
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
                  {perfil.profile.points}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Lista de cupones */}
      {loading ? (
        // <Box
        //   sx={{
        //     backgroundColor: "#fff",
        //     borderRadius: 3,
        //     boxShadow: 2,
        //     padding: 2,
        //   }}
        // >
        //   {[...Array(3)].map((_, index) => (
        //     <ListItem key={index} sx={{ padding: "12px 0" }}>
        //       <ListItemAvatar>
        //         <Skeleton variant="circular" width={40} height={40} />
        //       </ListItemAvatar>
        //       <ListItemText
        //         primary={<Skeleton variant="text" width="60%" />}
        //         secondary={<Skeleton variant="text" width="40%" />}
        //         sx={{ marginRight: 2 }}
        //       />
        //       <Skeleton variant="text" width={30} />
        //     </ListItem>
        //   ))}
        // </Box>
        null
      ) : (
        perfil.profile.points_history?.length > 0 && (
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: 2,
              padding: 2,
            }}
          >
            <List disablePadding>
              {perfil.profile.points_history.map((coupon, index) => (
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
                      sx={{
                        backgroundColor: coupon.action == "charge"? "#82e0aa":"#D90036",
                        width: 40,
                        height: 40,
                      }}
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
                        {coupon.action == "charge"? `Cargado el: ${coupon.date}`: `Canjeado el: ${coupon.date}`}
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
        )
      )}
    </Box>
  );
};

export default Perfil;
