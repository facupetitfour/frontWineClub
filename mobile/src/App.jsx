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
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import PerfilRegister from "./pages/PerfilRegister";
import ClaimView from "./pages/claimView";
import ScrollToTop from "./pages/component/ScrollToTop";
import EditProfile from "./pages/EditProfile";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerPerfil" element={<PerfilRegister/>}/>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<PlantillaMobile />}>
          <Route path="/home" element={<Home />} />
          <Route path="/bodega" element={<Bodega />} />
          <Route path="/allbodegas" element={<AllBodegas />} />
          <Route path="/allproducts" element={<AllItemsViews_Products_Coupons nameRendering={'Productos'} urlRender={'products'}/>} />
          <Route path="/allcoupons" element={<AllItemsViews_Products_Coupons nameRendering={'Cupones'} urlRender={'coupon'}/>} />
          <Route path="/itemrendermodel" element={<ItemRender/>}/>
          <Route path="/itemrender" element={<ItemRender/>}/>
          <Route path="/claimrender" element={<ClaimView/>}/>
          <Route path="/mycoupons" element={<MisCupones/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/myperfil" element={<EditProfile/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
