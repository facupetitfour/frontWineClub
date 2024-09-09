import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";
import InicioSesion from "./pages/LogIn";
import Products from "./component/Products";
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
            <Route path="/products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
