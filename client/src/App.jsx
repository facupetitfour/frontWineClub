import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRouteAdministrador from "./component/ProtectedRouteAdministrador";
import Register from "./pages/Register";
import Home from "./pages/Home";
import InicioSesion from "./pages/LogIn";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Coupons from "./pages/Coupons";
import Avaiable from "./pages/Avaiable";
import SideBar from "./component/SideBar";
import ProtectedRouteBodega from "./component/ProtectedRouteBodegas";
import Points from "./pages/Points";
import SideBarBodega from "./component/SideBarBodega";
import ProductsBodega from "./pages/ProductsBodega";
import CouponsBodega from "./pages/CouponsBodega";
import VerifyEmail from "./pages/VerifyEmail";
import EditBodegaProfile from "./pages/EditProfileBodega";

function App() {
  return (
    <Router>
      <Routes>

        {/* Rutas separadas unas con sidebar y protegidas, otras no. */}
        <Route path="/" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        Rutas protegidas y sidebar  administrador
        <Route element={<ProtectedRouteAdministrador />}>
          <Route element={<SideBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/avaiable" element={<Avaiable />} />
          </Route>
        </Route>

        {/* Rutas protegidas Bodega*/}
        <Route element={<ProtectedRouteBodega />}>
          <Route element={<SideBarBodega />}>
            <Route path="/bodega/home" element={<Home />} />
            <Route path="/bodega/avaiable" element={<Avaiable />} />
            <Route path="/bodega/myprofile" element={<EditBodegaProfile/>} />
            <Route path="/bodega/points" element={<Points/>} />
            <Route path="/bodega/products" element={<ProductsBodega />} />
            <Route path="/bodega/coupons" element={<CouponsBodega />} />
            {/* <Route path="/bodega/points" element={<Points />} /> */}

          </Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
