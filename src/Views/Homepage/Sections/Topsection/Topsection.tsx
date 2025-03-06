import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, sectionData } from "../../../../Models/Section";

export const Topsection = () => {
  const [section, setSection] = useState<Section>(sectionData[0]);

  const navigate = useNavigate();

  const getInfoLink = () => {
    const infoLink = section.link.split("/")[1];
    navigate(`/${infoLink}`);
  };
  return (
    <>
      <span className="flex flex-col items-center mb-4">
        <img
          src={section.img}
          alt="product"
          className="h-96 w-full object-cover cursor-pointer mb-2"
          onClick={() => navigate("/coffee")}
        />
        <span className="flex flex-col items-center mb-4">
          <div
            className="text-[2rem] font-extrabold w-11/12"
            onClick={() => navigate(section.link)}
          >
            {section.header}
          </div>
          <div className="w-[90%] leading-5">{section.text}</div>
        </span>
        <div className="w-[90%] mb-6 flex items-center">
          <button
            className="border border-black py-2.5 px-4 rounded-xs !mr-6"
            onClick={() => getInfoLink()}
          >
            Läs mer
          </button>
          <button
            className="border border-black bg-neutral-900 text-neutral-50 py-2.5 px-4 rounded-xs"
            onClick={() => navigate(section.link)}
          >
            Handla kaffe
          </button>
        </div>
      </span>
    </>
  );
};
