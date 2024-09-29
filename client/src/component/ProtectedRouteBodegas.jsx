import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'

const ProtectedRouteBodega = () => {
  const token = Cookies.get('token');
  const decodeToken = {}
  if (token) {
    decodeToken == jwtDecode(token)
  }

  return decodeToken.rol === "bodega" && token ?  <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteBodega;