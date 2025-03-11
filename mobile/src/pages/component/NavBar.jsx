import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = () => {
  return (
    <>
      <AppBar
        component={"nav"}
        position="fixed"
        sx={{
          zIndex: 101,
          top: 0,
          bottom: "auto",
          minHeight: "8%",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h5" color={"white"}>
            WINE CLUB
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
