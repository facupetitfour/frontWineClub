import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";
import InicioSesion from "./pages/LogIn";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Coupons from "./pages/Coupons";
import Avaiable from "./pages/Avaiable";

import SideBar from "./component/SideBar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas separadas unas con sidebar y protegidas, otras no. */}
        
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas y sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SideBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/coupons" element={<Coupons/>} />
            <Route path="/avaiable" element={<Avaiable/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
