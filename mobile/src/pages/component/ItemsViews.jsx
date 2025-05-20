import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Array de imagenBaseItemss con su imagen y nombre

const ItemsViews = ({ nombre, icon, data }) => {
  console.log("data", data);
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 0, position: "relative", width: "calc(100% - 20px)" }}>
      {/* Título con ícono y "Ver más" */}
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
          {icon}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
            {nombre ? nombre : "item name"}
          </Typography>
        </Box>
        <button
          onClick={() => {
            navigate("/allproducts", {
              state: {
                nameRender: nombre,
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

      {/* Grid para mostrar las tarjetas en un estilo carrusel */}
      <Grid
        container
        spacing={2}
        sx={{ overflowX: "auto", flexWrap: "nowrap" }}
      >
        {data.map((item, index) => (
          <Grid item key={index} sx={{ minWidth: "40%", paddingBottom: 0.7 }}
          onClick={() => {
            navigate(`/itemrender`, { state: { data: item } });
          }}
          >
            {/* Card de la item */}
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                boxShadow: 4,
                minHeight: "100%",
              }}
            >
              {/* Imagen con gradiente */}
              <CardMedia
                component="img"
                height="140"
                image={item?.img?.length>0 ? item.img[0].url  : "/imagenBaseItems.webp"}
                alt={item.name}
                sx={{
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  },
                }}
              />
              {/* Nombre de la item */}
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
                  sx={{ fontWeight: "bold", fontSize: "14px", color: "#000" }}
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
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsViews;
