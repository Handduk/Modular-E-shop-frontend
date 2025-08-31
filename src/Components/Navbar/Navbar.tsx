import { faBars, faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavbarMenu } from "./Menu/NavbarMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useScrollVisibility } from "../../Hooks/useScrollVisibility";
import { useProduct } from "../../Context/ProductContext";

export const Navbar = () => {
  const { openCart, cartQuantity, isOpen, closeCart } = useCart();
  const { categorys } = useProduct();

  const [show, setShow] = useState<boolean>(false);
  const [brandImg, setBrandImg] = useState<string>("/IMG/logga.png");
  const [init, setInit] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showNavbar = useScrollVisibility(20);

  const checkLocation = showNavbar || location.pathname !== "/";
  const checkIfInCart = location.pathname === "/cart";

  useEffect(() => {
    if (show || isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, isOpen]);

  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "instant" });
      const timeout = setTimeout(() => setInit(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setInit(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    if (!show) {
      closeCart();
    }
    setShow(!show);
  };

  const toggleCart = () => {
    if (!isOpen) {
      setShow(false);
    }
    isOpen ? closeCart() : openCart();
  };

  return (
    <>
      <div className="h-20 flex flex-col justify-center items-center fixed top-0 left-0 w-full z-50">
        <nav
          className={`w-full h-full py-0 border-b border-solid !z-50
            ${
              checkLocation
                ? "bg-main-color border-b-neutral-90 dark:bg-secondary-color dark:border-b-neutral-800"
                : "bg-transparent border-0"
            }
            ${init ? "opacity-100" : "opacity-0"} ${
            location.pathname === "/" ? "transition-all duration-200" : ""
          }`}
        >
          <div className="flex justify-between items-center h-full ">
            <div
              className={`w-11 h-full border-0 flex flex-col justify-center items-center cursor-pointer pointer-events-auto transition-all duration-500 z-50
                 lg:hidden
                ${
                  checkLocation
                    ? "text-secondary-color dark:text-dark-secondary-color"
                    : "text-white dark:text-dark-secondary-color"
                }
                ${show && "hidden"}`}
              onClick={() => toggleMenu()}
            >
              {show ? (
                <FontAwesomeIcon icon={faX} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
            {/* <div className="w-11 h-full border-0 flex flex-col justify-center items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="cursor-pointer"
              />
            </div> */}
            <div className="h-full flex flex-row items-center w-full max-lg:hidden">
              <div
                className={`flex flex-row items-center h-full pe-5 transition-all duration-200 ${
                  checkLocation
                    ? "bg-transparent"
                    : "bg-black/40 shadow-[5px_5px_50px_rgba(0,0,0,0.8)]"
                }`}
              >
                <ul
                  className={`mb-0 flex space-x-6 text-2xl lg:text-xl z-40 ${
                    checkLocation
                      ? "text-secondary-color dark:text-dark-secondary-color"
                      : "text-dark-secondary-color dark:text-dark-secondary-color"
                  }`}
                >
                  {categorys &&
                    categorys.map((res, index) => (
                      <li
                        className="cursor-pointer"
                        key={index}
                        onClick={() => {
                          navigate(
                            "shop/" + encodeURIComponent(res.name.toLowerCase())
                          );
                          setShow(false);
                        }}
                      >
                        {decodeURIComponent(res.name)}
                      </li>
                    ))}
                  <li className="cursor-pointer">Kontakta oss</li>
                </ul>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full flex justify-center mt-1">
              <div
                className={`${checkLocation && "cursor-pointer"}`}
                onClick={() => navigate("/")}
              >
                <img
                  src={brandImg}
                  alt="brand logo"
                  className={`${
                    checkLocation ? "scale-100" : "scale-0"
                  } h-20 transition-all duration-500`}
                />
              </div>
            </div>
            <div
              className={`w-11 h-full ms-auto border-0 flex flex-col justify-center items-center cursor-pointer relative
            transition-all duration-500
              ${
                checkLocation
                  ? "text-secondary-color dark:text-dark-secondary-color"
                  : "text-dark-secondary-color"
              }
              ${checkIfInCart && "hidden"}`}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-2xl me-2 max-lg:text-lg max-lg:me-0"
                onClick={toggleCart}
              />
              {cartQuantity > 0 && (
                <div
                  className="w-6 h-6 text-sm absolute rounded-[50%] right-1 top-3 bg-red-600
                max-sm:w-5 max-sm:h-5 max-sm:text-[0.8rem] max-sm:top-4"
                >
                  <p className="text-white text-center font-semibold">
                    {cartQuantity}
                  </p>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <NavbarMenu show={show} setShow={setShow} />
    </>
  );
};
