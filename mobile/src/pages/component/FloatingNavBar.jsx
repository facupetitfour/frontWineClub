import { Box, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/StoreOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const FloatingNavBar = () => {

  const navigate = useNavigate()

  const optionsDrawer = [
    {
      title: "Productos",
      route: "/allproducts",
      icon: <StoreIcon sx={{ fontSize: "24px", color: "#404040" }} />,
      disable: false,
    },
    {
      title: "Cupones",
      route: "/allcoupons",
      icon: (
        <ConfirmationNumberIcon sx={{ fontSize: "24px", color: "#404040" }} />
      ),
      disable: false,
    },
    {
      title: "Promocionados",
      route: "/promotions",
      icon: <PercentIcon sx={{ fontSize: "24px", color: "#404040" }} />,
      disable: true,
    },
    {
      title: "Favoritos",
      route: "/myfavorite",
      icon: <FavoriteBorderIcon sx={{ fontSize: "24px", color: "#404040" }} />,
      disable: true,
    },
  ];
  return (
    <Box
      sx={{ position: "relative", width: "100%", height: "100%", padding: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          gap: "32px",
          width: "100%",
          height: "55px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.25)",
          borderRadius: "70px",
          // zIndex: 1000,
        }}
      >
        {optionsDrawer.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "78px",
              height: "55px",
            }}
            key={index}
            onClick = {()=>{
              if (!item.disable) {
                navigate(item.route)
              }
            }}
          >
            {item.icon}

            <Typography
              sx={{ fontSize: "12px", fontWeight: 200, color: "#404040" }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FloatingNavBar;
