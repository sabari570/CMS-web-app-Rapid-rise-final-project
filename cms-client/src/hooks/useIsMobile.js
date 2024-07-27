import { useEffect, useState } from "react";

function useIsMobile(breakPoint) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakPoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Event listener removed");
    };
  }, [breakPoint]);

  return isMobile;
}

export default useIsMobile;
