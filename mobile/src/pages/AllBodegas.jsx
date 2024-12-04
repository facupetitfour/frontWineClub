import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const BACK_URL = import.meta.env.VITE_BACK_URL;

function AllBodegas() {
  const navigate = useNavigate();
  const location = useLocation()
  const { data: locationData } = location.state || {};
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (BACK_URL) {
        try {
          const response = await axios.get(`${BACK_URL}users/usersBodega`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Fetched data:", response.data);
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
    }
  }, [locationData]);
  // Determina qué datos renderizar
  const itemsToRender = locationData || fetchedData;
  return (
    <>
      <Box sx={{ padding: 2, minHeight: "100vh", minWidth:"100%" }}>
        <Box
          sx={{
            flexDirection: "column",
            gap: 1,
            width: "100%",
            justifyContent: "center", // Alinea en el eje horizontal
            alignItems: "center", // Alinea en el eje vertical
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
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#000" }}
              >
                Bodegas Asociadas
              </Typography>
            </Box>
          </Box>
          {/* Grid para mostrar las tarjetas */}
          <Grid container spacing={2}>
            {itemsToRender ? (
              itemsToRender.map((bodega, index) => (
                <Grid
                  item
                  xs={6}
                  key={index}
                  onClick={() => {
                    navigate("/bodega", {
                      state: {
                        data: bodega
                      },
                    });
                  }}
                >
                  {/* Card de la bodega */}
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    {/* Imagen */}
                    <CardMedia
                      component="img"
                      height="140"
                      image={bodega.profile.img || 'bodega1.avif'}
                      alt={bodega.profile.name}
                    />
                    {/* Name de la bodega */}
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        {bodega.profile.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={6}></Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AllBodegas;
