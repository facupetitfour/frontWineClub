import { useEffect } from "react";
import Carrusel from "./component/Carrusel";
import { Box } from "@mui/material";
import FloatingNavBar from "./component/FloatingNavBar";
import BodegasAsociadas from "./component/BodegasAsociadas";
import axios from "axios";
import { useState } from "react";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const Home = () => {
  const [data, setData] = useState([]) 
  // const data = [
  //   { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
  //   { nombre: "Bodega Los Toneles", imagen: "/bodega.webp" },
  //   { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
  //   { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
  //   { nombre: "Bodega Trivento", imagen: "/bodega.webp" },
  //   { nombre: "Bodega Roberto B.", imagen: "/bodega.webp" },
  // ]

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getData = async () => {
      if (BACK_URL) {
        try {
          await axios.get(`${BACK_URL}users/usersBodega`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response)=>{
            setData(response.data)
          });
        } catch (error) {
          console.log(error.message)
        }
      }else{
        console.log(`NO HAY URL: ${BACK_URL}`)
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carrusel />
        <FloatingNavBar />
        <BodegasAsociadas data={data}/>
      </Box>
    </>
  );
};

export default Home;
