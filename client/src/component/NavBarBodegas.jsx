import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "./MenuAccount";

const NavBarBodegas = () => {
  return (

    <>
      <AppBar
        position="fixed"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            WINE CLUB
          </Typography>
          <NavBar />
        </Toolbar>
      </AppBar>

    </>
  )
}

export default NavBarBodegas