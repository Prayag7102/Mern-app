import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner
  }, [location.pathname]); // Trigger on pathname change

  return null; // This component doesn't render anything
};

export default ScrollToTop;
