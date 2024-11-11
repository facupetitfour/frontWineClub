import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACK_URL = import.meta.env.VITE_BACK_URL;


function AllItemsViews_Products_Coupons({nameRendering, urlRender}) {
  const navigate = useNavigate();

  const [data,setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      if (BACK_URL) {
        try {
          await axios.get(`${BACK_URL}${urlRender}`).then((response) => {
            console.log(response.data)
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
  },[urlRender]);

  return (
    <>
      <Box sx={{ padding:2, minHeight: "100vh" }}>
        <Box
          sx={{
            flexDirection: "column",
            gap: 1,
            width: "100%",
            justifyContent: "center", // Alinea en el eje horizontal
            alignItems: "center", // Alinea en el eje vertical
          }}
        >
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
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#000" }}
              >
                {nameRendering}
              </Typography>
            </Box>
          </Box>
          {/* Grid para mostrar las tarjetas */}
          <Grid container spacing={2}>
            {data ? (
              data.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  key={index}
                  onClick={() => {
                    navigate(`/${urlRender}`, {
                      state: {
                        data: item,
                      },
                    });
                  }}
                >
                  {/* Card de la item */}
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    {/* Imagen */}
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.img}
                      alt={item.name}
                    />
                    {/* Nombre de la item */}
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={6}></Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AllItemsViews_Products_Coupons;
