import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  const linkStyle =
    "w-fit flex flex-row items-center space-x-2 !text-dark-secondary-color !no-underline";

  const links = [
    {
      className: linkStyle,
      href: "https://maps.app.goo.gl/HDyp9LBXQrzX7P9d6",
      target: "_blank",
      icon: faLocationDot,
      text: "Huvudstad 201 59294 Vadstena",
    },
    {
      className: linkStyle,
      href: "https://www.instagram.com/rosteriet_vadstena/",
      target: "_blank",
      icon: faInstagram,
      text: "Rosteriet_Vadstena",
    },
    {
      className: linkStyle,
      href: "https://facebook.com/RosterietVadstena/",
      target: "_blank",
      icon: faFacebook,
      text: "Rosteriet Vadstena",
    },
  ];
  return (
    <div className="w-screen bg-secondary-color flex flex-col justify-center p-2 text-dark-secondary-color md:items-center">
      <div className="text-xl font-bold  lg:text-3xl">Hitta till oss!</div>
      <div className="w-full flex flex-row justify-around lg:pt-2">
        <div className="max-lg:hidden w-1/2 flex justify-end items-center pr-12">
          <img src="/IMG/logga.png" alt="brand logo" className="h-28" />
        </div>
        <div className="w-full my-2 flex flex-col justify-start space-y-2 lg:w-1/2 lg:ps-12">
          {links.map((link, index) => (
            <a
              href={link.href}
              target={link.target}
              className={link.className}
              key={index}
            >
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.text}</span>
            </a>
          ))}
          <div className="w-fit">Org.nr: 556895-8325</div>
        </div>
      </div>
    </div>
  );
};
