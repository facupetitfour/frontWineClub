import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";

const PlantillaMobile = () => {
  return (
    <>
      <NavBar/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",  // Alinea en el eje horizontal
          flexDirection: "column",   // Cambia la dirección a columna
          alignItems: "center",       // Alinea en el eje vertical
          // minHeight: "calc(100vh)",
          minWidth: "100vw",
          marginTop: "20%",
          marginBottom: "20%",
        }}
      >
        <Outlet/>
      </Box>
      <BottomBar/>
    </>
  );
};

export default PlantillaMobile;
