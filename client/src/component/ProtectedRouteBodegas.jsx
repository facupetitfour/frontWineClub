import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'

const ProtectedRouteBodega = () => {

  const token = Cookies.get('token');
  if (token) {
    const decodeToken = jwtDecode(token)
    return decodeToken.rol === "bodega" && token ?  <Outlet /> : decodeToken.rol === "administrador" ? <Navigate to= "/home"/> 
    : <Navigate to="/" />;
  }

};

export default ProtectedRouteBodega;


