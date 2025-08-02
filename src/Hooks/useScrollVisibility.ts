import { useEffect, useState } from "react"

export const useScrollVisibility = (threshold: number) : boolean => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 20) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [threshold]);

      return isVisible;
}