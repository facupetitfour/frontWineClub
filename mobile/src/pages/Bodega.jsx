import Carrusel from "./component/Carrusel";
import { Box } from "@mui/material";
import ItemsViews from "./component/ItemsViews";
import StoreIcon from '@mui/icons-material/Store';
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { useLocation } from 'react-router-dom';

const Bodega = () => {

  const location = useLocation();
  const {data} = location.state || {};
  console.log("bodega",data);
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
        <Carrusel imagenesBodega={data.profile.img} nombreBodega={data.profile.name + ' ' + data.profile.surname}/>
        <ItemsViews nombre={"Productos"} icon = {<StoreIcon/>} data = {data.products}/>
        <ItemsViews nombre={"Cupones"} icon = {<ConfirmationNumberIcon/>} data = {data.coupons}/>
      </Box>
    </>
  );
};

export default Bodega;
