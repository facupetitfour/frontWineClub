import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'

const ProtectedRouteAdministrador = () => {

  const token = Cookies.get('token');
  if (token) {
    console.log(token)
    const decodeToken = jwtDecode(token)
    return decodeToken.rol === "administrador" && token 
    ?  <Outlet /> : decodeToken.rol === "bodega" ? <Navigate to= "/points"/> 
    : <Navigate to="/login" />;}
};

export default ProtectedRouteAdministrador;