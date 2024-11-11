import Carrusel from "./component/Carrusel";
import { Box } from "@mui/material";
import ItemsViews from "./component/ItemsViews";
import StoreIcon from '@mui/icons-material/Store';
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { useLocation } from 'react-router-dom';

const Bodega = () => {

  const location = useLocation();
  const { nombre, img } = location.state || {};
  console.log(nombre,img)
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
        <Carrusel/>
        <ItemsViews nombre={"Productos"} icon = {<StoreIcon/>}/>
        <ItemsViews nombre={"Cupones"} icon = {<ConfirmationNumberIcon/>}/>
      </Box>
    </>
  );
};

export default Bodega;
