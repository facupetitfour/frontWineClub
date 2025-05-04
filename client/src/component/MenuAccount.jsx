import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logout from "@mui/icons-material/Logout";
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';

const serverhost = "http://localhost:3000/";

const MenuAccount = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const valor = Cookies.get("token");
    setAuth(valor || "Cookie no definida");
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    // Clear the cookie
    Cookies.remove("token");
    // Clear the auth state
    setAuth(null);
    // Redirect to the login page
    navigate("/");


    // axios
    //   .post(serverhost + "authenticate/logOut", {}, { withCredentials: true })
    //   .then((response) => {
    //     console.log("RESPONSE LOG OUT: ", response);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("ERROR AL LOGOUT", error);
    //   });
  };

  return (
    <Toolbar>
      {auth && (
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
          <Tooltip title="Settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Toolbar>
  );
};

export default MenuAccount;
