import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BottomBar from "./bottomBar";

const PlantillaMobile = () => {
  return (
    <>
      <NavBar/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",  // Alinea en el eje horizontal
          alignItems: "center",       // Alinea en el eje vertical
          minHeight: "calc(100vh)",
          minWidth: "100vw",
          marginTop: "20%",
          marginBottom: "20%"
        }}
      >
        <Outlet/>
      </Box>
      <BottomBar/>
    </>
  );
};

export default PlantillaMobile;
