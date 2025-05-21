import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BodegasAsociadas = ({ data, loading }) => {
  const navigate = useNavigate();

  const skeletonItems = Array.from({ length: 4 });
  console.log("data", data);
  return (
    <Box sx={{ padding: 2, minWidth: "100%" }}>
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
              state: { data },
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

      {/* Grid de tarjetas o Skeletons */}
      <Grid container spacing={2}>
        {(loading ? skeletonItems : data).map((bodega, index) => (
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
                  sx={{
                    height: 140,
                    width: "100%",
                    objectFit: "cover",
                  }}
                  component="img"
                  image={bodega.profile?.img[0]?.url || "/bodega1.avif"}
                  alt={bodega.name}
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
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1, // número de líneas visibles
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {bodega.profile.name + ' ' + bodega.profile.surname}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BodegasAsociadas;
