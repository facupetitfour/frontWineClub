import { Box, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/StoreOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FloatingNavBar = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', padding:1}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          gap: "32px",
          width: "100%",
          height: "55px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.25)",
          borderRadius: "70px",
          // zIndex: 1000,
        }}
      >
        {/* Primer Icono: Productos */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "78px",
            height: "55px",
          }}
        >
          <StoreIcon sx={{ fontSize: "24px", color: "#404040" }} />
          <Typography
            sx={{ fontSize: "12px", fontWeight: 200, color: "#404040" }}
          >
            Productos
          </Typography>
        </Box>

        {/* Segundo Icono: Cupones */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "78px",
            height: "55px",
          }}
        >
          <ConfirmationNumberIcon sx={{ fontSize: "24px", color: "#404040" }} />
          <Typography
            sx={{ fontSize: "12px", fontWeight: 200, color: "#404040" }}
          >
            Cupones
          </Typography>
        </Box>

        {/* Tercer Icono: Promocionados */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "78px",
            height: "55px",
          }}
        >
          <PercentIcon sx={{ fontSize: "24px", color: "#404040" }} />
          <Typography
            sx={{ fontSize: "12px", fontWeight: 200, color: "#404040" }}
          >
            Promocionados
          </Typography>
        </Box>

        {/* Cuarto Icono: Favoritos */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "78px",
            height: "55px",
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: "24px", color: "#404040" }} />
          <Typography
            sx={{ fontSize: "12px", fontWeight: 200, color: "#404040" }}
          >
            Favoritos
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingNavBar;
