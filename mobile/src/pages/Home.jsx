import React, { useEffect } from "react";
import Carrusel from "./component/Carrusel";
import { Box } from "@mui/material";
import FloatingNavBar from "./component/FloatingNavBar";
import BodegasAsociadas from "./component/BodegasAsociadas";
import axios from "axios";

const BACK_URL = import.meta.env.BACK_URL;

const Home = () => {
  axios;

  useEffect(() => {
    const getData = async () => {
      console.log("entre el effect")
      try {
        await axios.get(BACK_URL, "bodegas").then((response) => {
          if (response.status === 200 || 201) {
           console.log(response);  
          }else{
            throw new Error(response.message);
          }
        });
      } catch (error) {
        console.log(error.message)
      }
    };
    getData()
  },[]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
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

export default Home;
