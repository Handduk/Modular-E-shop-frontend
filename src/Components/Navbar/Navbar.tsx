import {
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar as Navigation } from "react-bootstrap";
import { useState } from "react";

interface SpecialOfferProps {
  message: string;
  link: string;
}

const specialOfferObject: SpecialOfferProps = {
  message: "special offer",
  link: "placeholder link",
};

export const Navbar = () => {
  const [brandName, setBrandName] = useState<string>("Placeholder");
  const [specialOffer, setSpecialOffer] =
    useState<SpecialOfferProps>(specialOfferObject);
  const [specialLink, setSpecialLink] = useState<string>("/");
  return (
    <>
      <div className="container-nav">
        <div className="special-nav">
          {`${specialOffer.message} `}
          <a href={specialLink} className="specialOfferLink-nav">
            {specialOffer.link}
          </a>
        </div>
        <Navigation expand="lg" className="nav-nav">
          <Navigation.Toggle className="navToggle-nav" />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-nav" />
          <Navigation.Brand className="brandLink-nav" href="/">
            {brandName}
          </Navigation.Brand>
          <FontAwesomeIcon className="profile-nav" icon={faUser} />
          <FontAwesomeIcon className="cart-nav" icon={faCartShopping} />
        </Navigation>
      </div>
    </>
  );
};
