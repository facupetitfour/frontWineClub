import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Skeleton,
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nameRender) {
      setNameToRender(nameRender);
    }
  }, [nameRender]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (BACK_URL && urlRender) {
        setLoading(true);
        try {
          const response = await axios.get(`${BACK_URL}${urlRender}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFetchedData(response.data);
        } catch (error) {
          // console.error("Error fetching data:", error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!locationData) {
      fetchData();
      setNameToRender(nameRendering);
    }
  }, [urlRender, locationData, nameRendering]);

  const itemsToRender = locationData || fetchedData;

  const skeletonArray = Array.from({ length: 6 });

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
          {loading
            ? skeletonArray.map((_, index) => (
                <Grid item xs={6} key={index}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      minHeight: "100%",
                      boxShadow: 2,
                    }}
                  >
                    <Skeleton variant="rectangular" height={140} />
                    <CardContent sx={{ padding: '8px 0' }}>
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", padding: '8px' }}>
                      <Skeleton variant="text" width="30%" />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : itemsToRender && itemsToRender.length > 0
            ? itemsToRender.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  key={index}
                  sx={{minHeight: "100%"}}
                  onClick={() => {
                    navigate(`/itemrender`, { state: { data: item } });
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      minHeight: "100%",
                      boxShadow: 2,
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 140,
                        width: "100%",
                        objectFit: "cover",
                      }}
                      component="img"
                      image={item?.img?.length>0 ? item.img[0].url  : "/imagenBaseItems.webp"}
                      alt={item.name || "Sin nombre"}
                    />
                    <CardContent
                      sx={{
                        textAlign: "center",
                        padding: "8px 0",
                        minHeight: "50px",
                        maxHeight: "50px",
                      }}
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
                    <CardActions
                      sx={{
                        minHeight: "20px",
                        minWidth: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
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
            : (
              <Typography>No hay datos para mostrar</Typography>
            )}
        </Grid>
      </Box>
    </Box>
  );
}

export default AllItemsViews_Products_Coupons;
