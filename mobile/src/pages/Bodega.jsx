import React from "react";
import Carrusel from "./component/Carrusel";
import { Box } from "@mui/material";
import FloatingNavBar from "./component/FloatingNavBar";
import BodegasAsociadas from "./component/BodegasAsociadas";

const Bodegas = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width:"100%",
          justifyContent: "center", // Alinea en el eje horizontal
          alignItems: "center", // Alinea en el eje vertical
        }}
      >
        <Carrusel />
        <FloatingNavBar />
        <BodegasAsociadas />
      </Box>
    </>
  );
};

export default Bodegas;
