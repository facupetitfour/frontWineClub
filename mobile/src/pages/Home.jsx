import { useEffect, useState } from "react";
import Carrusel from "./component/Carrusel";
import { Box } from "@mui/material";
import FloatingNavBar from "./component/FloatingNavBar";
import BodegasAsociadas from "./component/BodegasAsociadas";
import axios from "axios";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Estado para el loading

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getData = async () => {
      if (BACK_URL) {
        try {
          const response = await axios.get(`${BACK_URL}users/usersBodega`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          // console.log(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log(`NO HAY URL: ${BACK_URL}`);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carrusel />
      <FloatingNavBar />
      <BodegasAsociadas data={data} loading={loading} />
    </Box>
  );
};

export default Home;
