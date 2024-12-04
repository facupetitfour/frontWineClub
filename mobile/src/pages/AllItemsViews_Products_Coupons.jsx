import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BACK_URL = import.meta.env.VITE_BACK_URL;

function AllItemsViews_Products_Coupons({ nameRendering, urlRender }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: locationData, nameRender } = location.state || {};
  const [fetchedData, setFetchedData] = useState([]);
  const [nameToRender, setNameToRender] = useState(nameRendering);

  useEffect(() => {
    if (nameRender) {
      setNameToRender(nameRender);
    }
  }, [nameRender]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (BACK_URL && urlRender) {
        try {
          const response = await axios.get(`${BACK_URL}${urlRender}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log("Fetched data:", response.data);
          setFetchedData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      } else {
        console.log("Missing URL or BACK_URL:", BACK_URL);
      }
    };

    // Solo ejecuta fetchData si no hay datos de location
    if (!locationData) {
      fetchData();
      setNameToRender(nameRendering);
    }
  }, [urlRender, locationData, nameRendering]);

  // Determina qué datos renderizar
  const itemsToRender = locationData || fetchedData;

  return (
    <Box sx={{ padding: 2, minHeight: "100vh", minWidth: "100%" }}>
      <Box
        sx={{
          flexDirection: "column",
          gap: 1,
          minWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #D90036",
            paddingBottom: 1,
            marginBottom: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
              {nameToRender}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {itemsToRender && itemsToRender.length > 0 ? (
            itemsToRender.map((item, index) => (
              <Grid
                item
                xs={6}
                key={index}
                onClick={() => {
                  navigate(`/itemrender`, { state: { data: item } });
                }}
              >
                <Card
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    minHeight: "100%",
                    boxShadow: 2
                  }}
                >
                  <CardMedia
                    component="img"
                    // sx={{height:"140"}}
                    image={item.img || "imagenBaseItems.webp"}
                    alt={item.name || "Sin nombre"}
                  />
                  <CardContent
                    sx={{textAlign: 'center', padding: '8px 0',minHeight:"50px", maxHeight:"50px"}}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{minHeight:"20px",minWidth:"100%", justifyContent:"flex-end"}}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "18px",
                      }}
                    >
                      {item.points_required}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No hay datos para mostrar</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default AllItemsViews_Products_Coupons;
