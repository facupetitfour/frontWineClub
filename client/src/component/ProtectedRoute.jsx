import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('token');
  console.log("FLAG TOKEN",token)
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;