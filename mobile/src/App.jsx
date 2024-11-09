import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import InicioSesion from "./pages/LogIn";
import Home from "./pages/Home";
import PlantillaMobile from "./pages/component/PlantillaMobile";
import Bodegas from "./pages/Bodega";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route element={<PlantillaMobile/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/bodegas" element={<Bodegas/>} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
