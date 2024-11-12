import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// Array de bodegas con su imagen y nombre

const BodegasAsociadas = ({ data }) => {
  const navigate = useNavigate();
  console.log(data)
  return (
    <Box sx={{ padding: 2, minWidth:"100%"}}>
      {/* Título */}
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
            Bodegas Asociadas
          </Typography>
        </Box>
        <button
          onClick={() => {
            navigate("/allbodegas", {
              state: {
                data: data,
              },
            });
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
          }}
        >
          <Typography
            sx={{
              fontStyle: "italic",
              color: "#000",
              fontSize: "16px",
            }}
          >
            Ver más
          </Typography>
        </button>
      </Box>

      {/* Grid para mostrar las tarjetas */}
      <Grid container spacing={2}>
        {data.map((bodega, index) => (
          <Grid
            item
            xs={6}
            key={index}
            onClick={() => {
              navigate("/bodega", {
                state: {
                  data:bodega,
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
                image={bodega.img || '/bodega1.avif'}
                alt={bodega.name}
              />
              {/* Nombre de la bodega */}
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "14px",
                    overflow: true
                  }}
                >
                  {bodega.profile.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BodegasAsociadas;
