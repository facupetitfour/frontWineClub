import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Alert,
  Box,
  List,
  ListItem,
  Button,
  CardActions,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useLocation } from "react-router-dom";
import Carousel from "./component/Carrusel";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL;
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const ItemRender = () => {
  const location = useLocation();
  const item = location.state?.data || {};
  const [messageError, setMssageError] = useState();

  const claimfunction = async (item) => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);
    if (BACK_URL) {
      try {
        if (item.type === "coupon") {
          await axios
            .post(
              `${BACK_URL}users/claimCoupon`,
              {
                id: sub,
                coupon: item,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
            });
        }
        if(item.type === "product"){
          await axios
            .post(
              `${BACK_URL}users/claimProduct`,
              {
                id: sub,
                product: item,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
            });
        }
      } catch (error) {
        console.log(error.response.data);
        setMssageError(error.response.data.message);
      }
    } else {
      console.log(`NO HAY URL: ${BACK_URL}`);
    }
  };

  const canjearFunction = (item) => {
    console.log("canjeado: ", item);
    claimfunction(item);
  };

  return (
    <>
      {item ? (
        <Box
          sx={{
            minHeight: "100vh",
            minWidth: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          {messageError && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Alert
                variant="filled"
                severity="error"
                onClose={() => {
                  setMssageError(null);
                }}
                sx={{
                  position: "absolute",
                  zIndex: 10,
                  maxWidth: "90%",
                  width: "auto",
                }}
              >
                {messageError}
              </Alert>
            </Box>
          )}
          <Card sx={{ marginBottom: 3, borderRadius: 3, boxShadow: 3 }}>
            {/* Image Section */}
            <CardMedia height="200">
              <Carousel imagenesBodega={item.img} />
            </CardMedia>

            {/* Title, Description and Points Section */}
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" component="div" noWrap>
                  {item.name}
                </Typography>
                <Box display="flex" alignItems="center">
                  <LocalMallIcon sx={{ mr: 0.5 }} />
                  <Typography variant="h6" component="div">
                    {item.points_required}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                fullWidth
                onClick={() => canjearFunction(item)}
                variant="contained"
              >
                Canjear
              </Button>
            </CardActions>
          </Card>

          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: 2,
              padding: 2,
            }}
          >
            <List disablePadding>
              {/* Reviews Section */}
              {item.opinions?.map((opinion, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom:
                      index !== item.opinions.length - 1
                        ? "1px dashed #db2c6f"
                        : "none",
                    padding: "12px 0",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ minWidth: "100%" }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        fontWeight="bold"
                      >
                        {opinion.username}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        {[...Array(opinion.valorate)].map((_, index) => (
                          <StarIcon
                            key={index}
                            fontSize="small"
                            sx={{ color: "#FFD700" }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {opinion.description}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      ) : (
        null
      )}
    </>
  );
};

export default ItemRender;
