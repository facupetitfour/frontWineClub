import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  CardActions,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useLocation } from "react-router-dom";
import Carousel from "./component/Carrusel";
// const BACK_URL = import.meta.env.VITE_BACK_URL;

const ClaimView = () => {
  const location = useLocation();
  const item = location.state?.data || {};

  const canjearFunction = (item) => {
    console.log("canjeado: ", item);
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
                {item.code}
              </Button>
            </CardActions>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          
        </Box>
      )}
    </>
  );
};

export default ClaimView;
