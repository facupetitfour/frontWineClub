import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src="/404notfound.png"
        alt="Not Found"
        sx={{ width: "100%", maxWidth: 300, mb: 3 }}
      />
      <Typography variant="h3" component="h1" gutterBottom>
        ¡Oops! Página en elaboracion
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Parece que esta sección aún no está lista. Estamos trabajando en esta seccion!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/home")}
        sx={{
          textTransform: "none",
        }}
      >
        Volver al Inicio
      </Button>
    </Container>
  );
};

export default NotFound;
