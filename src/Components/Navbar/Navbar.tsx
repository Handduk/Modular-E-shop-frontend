import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavbarMenu } from "./Menu/NavbarMenu";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

interface SpecialOfferProps {
  message: string;
  link: string;
}

const specialOfferObject: SpecialOfferProps = {
  message: "special offer",
  link: "placeholder link",
};

interface NavbarProps {
  open: boolean;
}

export const Navbar = ({ open }: NavbarProps) => {
  const { openCart, cartQuantity, isOpen, closeCart } = useCart();

  const [show, setShow] = useState<boolean>(false);
  const [brandImg, setBrandImg] = useState<string>("/IMG/logga.png");
  const [specialOffer, setSpecialOffer] =
    useState<SpecialOfferProps>(specialOfferObject);
  const [specialLink, setSpecialLink] = useState<string>("/");

  const navigate = useNavigate();

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
      <div className="bg-neutral-800 h-20 flex flex-col justify-center items-center sticky top-0">
        <div className="w-full text-center text-neutral-50">
          {`${specialOffer.message} `}
          <a
            onClick={() => navigate(specialLink)}
            className="cursor-pointer text-white !no-underline"
          >
            {specialOffer.link}
          </a>
        </div>
        <nav className="w-full h-[70%] bg-main-color border-b-neutral-900 py-0 border-b border-solid">
          <div className="flex justify-between items-center h-full">
            <div
              className="w-11 h-full border-0 flex flex-col justify-center items-center cursor-pointer"
              onClick={() => toggleMenu()}
            >
              {show ? (
                <FontAwesomeIcon icon={faX} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
            <div className="w-11 h-full border-0 flex flex-col justify-center items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="cursor-pointer"
              />
            </div>
            <div
              className="cursor-pointer px-4 py-0 mx-[3.125rem]"
              onClick={() => navigate("/")}
            >
              <img src={brandImg} alt="brand logo" className="h-16" />
            </div>
            <div className="w-11 h-full border-0 flex flex-col justify-center items-center cursor-pointer">
              <FontAwesomeIcon className="cursor-pointer p-3" icon={faUser} />
            </div>
            <div className="w-11 h-full border-0 flex flex-col justify-center items-center cursor-pointer relative">
              <FontAwesomeIcon icon={faCartShopping} onClick={toggleCart} />
              {cartQuantity > 0 && (
                <div className="w-5 h-5 text-[0.75rem] self-center absolute rounded-[50%] right-1 top-2 bg-red-600">
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
