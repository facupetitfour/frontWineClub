import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

const ProtectedRouteAdministrador = () => {

  const token = localStorage.getItem('access_token');
  if (token) {
    const decodeToken = jwtDecode(token)
    return decodeToken.rol === "administrador" && token 
    ?  <Outlet /> : decodeToken.rol === "bodega" ? <Navigate to= "/bodega/points"/> 
    : <Navigate to="/" />;

  }

};

export default ProtectedRouteAdministrador;