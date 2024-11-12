import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import InicioSesion from "./pages/LogIn";
import Home from "./pages/Home";
import PlantillaMobile from "./pages/component/PlantillaMobile";
import Bodega from "./pages/Bodega";
import AllBodegas from "./pages/AllBodegas";
import AllItemsViews_Products_Coupons from "./pages/AllItemsViews_Products_Coupons";
import ItemRender from "./pages/ItemRender";
import MisCupones from "./pages/misCupones";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PlantillaMobile />}>
          <Route path="/home" element={<Home />} />
          <Route path="/bodega" element={<Bodega />} />
          <Route path="/allbodegas" element={<AllBodegas />} />
          <Route path="/allproducts" element={<AllItemsViews_Products_Coupons nameRendering={'Productos'} urlRender={'products'}/>} />
          <Route path="/allcoupons" element={<AllItemsViews_Products_Coupons nameRendering={'Cupones'}/>} />
          <Route path="/itemrendermodel" element={<ItemRender/>}/>
          <Route path="/itemrender" element={<ItemRender/>}/>
          <Route path="/mycoupons" element={<MisCupones/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
