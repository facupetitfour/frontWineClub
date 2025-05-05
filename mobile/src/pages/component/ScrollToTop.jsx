import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 🔝 Esto mueve el scroll al tope
  }, [pathname]);

  return null;
};

export default ScrollToTop;
