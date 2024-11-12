import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function AllBodegas() {
  const navigate = useNavigate();
  const location = useLocation()
  let {data} = location.state || {}
  
  if (!data) {
    data =   [
      { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
      { nombre: "Bodega Los Toneles", imagen: "/bodega.webp" },
      { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
      { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
      { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
      { nombre: "Bodega Roberto B.", imagen: "/bodega.webp" },
    ];
  }


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
            {data ? (
              data.map((bodega, index) => (
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
