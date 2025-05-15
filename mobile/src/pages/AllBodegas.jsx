import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BACK_URL = import.meta.env.VITE_BACK_URL;

function AllBodegas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: locationData } = location.state || {};
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(!locationData); // loading solo si no hay locationData

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (BACK_URL) {
        try {
          const response = await axios.get(`${BACK_URL}users/usersBodega`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFetchedData(response.data);
        } catch (error) {
          // console.error("Error fetching data:", error.message);
        } finally {
          setLoading(false);
        }
      } else {
        // console.log("Missing URL or BACK_URL:", BACK_URL);
        setLoading(false);
      }
    };

    if (!locationData) {
      fetchData();
    }
  }, [locationData]);

  const itemsToRender = locationData || fetchedData;
  const skeletonItems = Array.from({ length: 6 });

  return (
    <Box sx={{ padding: 2, minHeight: "100vh", minWidth: "100%" }}>
      <Box
        sx={{
          flexDirection: "column",
          gap: 1,
          width: "100%",
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
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#000" }}
            >
              Bodegas Asociadas
            </Typography>
          </Box>
        </Box>

        {/* Grid para mostrar tarjetas o Skeletons */}
        <Grid container spacing={2}>
          {(loading ? skeletonItems : itemsToRender).map((bodega, index) => (
            <Grid
              item
              xs={6}
              key={index}
              onClick={
                !loading
                  ? () =>
                      navigate("/bodega", {
                        state: { data: bodega },
                      })
                  : undefined
              }
            >
              <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                {loading ? (
                  <Skeleton variant="rectangular" height={140} />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    image={bodega.profile.img || "bodega1.avif"}
                    alt={bodega.profile.name}
                  />
                )}
                <CardContent>
                  {loading ? (
                    <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
                  ) : (
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
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AllBodegas;
