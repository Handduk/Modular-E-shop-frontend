import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Image, Navbar as Navigation } from "react-bootstrap";
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

export const Navbar = () => {
  const { openCart, cartQuantity } = useCart();

  const [show, setShow] = useState<boolean>(false);
  const [brandImg, setBrandImg] = useState<string>("/IMG/logga.png");
  const [specialOffer, setSpecialOffer] =
    useState<SpecialOfferProps>(specialOfferObject);
  const [specialLink, setSpecialLink] = useState<string>("/");

  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <>
      <div className="container-nav">
        <div className="special-nav">
          {`${specialOffer.message} `}
          <a
            onClick={() => navigate(specialLink)}
            className="specialOfferLink-nav"
          >
            {specialOffer.link}
          </a>
        </div>
        <Navigation expand="md" className="nav-nav">
          <Navigation.Toggle
            className="navToggle-nav"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <FontAwesomeIcon icon={faX} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </Navigation.Toggle>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-nav" />
          <Navigation.Brand
            className="brandLink-nav"
            onClick={() => navigate("/")}
          >
            <Image className="logo-nav" src={brandImg} />
          </Navigation.Brand>
          <FontAwesomeIcon className="profile-nav" icon={faUser} />
          <div className="shoppingCart-nav">
            <FontAwesomeIcon
              className="cart-nav"
              icon={faCartShopping}
              onClick={openCart}
            />
            {cartQuantity > 0 && (
              <Badge className="productBag-nav" bg="danger">
                {cartQuantity}
              </Badge>
            )}
          </div>
        </Navigation>
      </div>
      <NavbarMenu show={show} setShow={setShow} />
    </>
  );
};
