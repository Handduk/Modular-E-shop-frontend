import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <div className="w-screen bg-secondary-color flex flex-col justify-center p-2 mt-auto md:items-center">
      <div className="text-xl font-bold text-main-color lg:text-3xl">
        Hitta till oss!
      </div>
      <div className="w-full flex flex-row justify-around lg:pt-2">
        <div className="max-lg:hidden w-1/2 flex justify-end items-center pr-12">
          <img src="/IMG/logga.png" alt="brand logo" className="h-28" />
        </div>
        <div className="w-full text-white my-2 flex flex-col justify-start space-y-2 lg:w-1/2 lg:ps-12">
          <a
            className="w-fit flex flex-row items-center space-x-2 text-white !no-underline"
            href="https://maps.app.goo.gl/HDyp9LBXQrzX7P9d6"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Huvudstad 201 59294 Vadstena</span>
          </a>
          <a
            className="w-fit flex flex-row items-center space-x-2 text-white !no-underline"
            href="https://www.instagram.com/rosteriet_vadstena/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span>Rosteriet_Vadstena</span>
          </a>
          <a
            className="w-fit flex flex-row items-center space-x-2 text-white !no-underline"
            href="https://facebook.com/RosterietVadstena/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Rosteriet Vadstena</span>
          </a>
          <div className="w-fit">Org.nr: 556895-8325</div>
        </div>
      </div>
    </div>
  );
};
