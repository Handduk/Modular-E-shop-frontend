import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, sectionData } from "../../../../Models/Section";

export const SecondSection = () => {
  const [section, setSection] = useState<Section>(sectionData[1]);

  const navigate = useNavigate();
  return (
    <span className="flex flex-col items-center bg-secondary-color">
      <img
        src={section.img}
        alt="product"
        className="h-96 w-full object-cover cursor-pointer mb-2"
        onClick={() => navigate("/coffee")}
      />
      <span className="flex flex-col items-center mb-4">
        <div
          className="text-[2rem] font-extrabold w-[90%] text-main-color"
          onClick={() => navigate(section.link)}
        >
          {section.header}
        </div>
        <div className="w-[90%] leading-5 text-main-color">{section.text}</div>
      </span>
      <div className="w-[90%] mb-12">
        <button
          className="border border-black bg-main-color py-2.5 px-4 rounded !mr-6"
          onClick={() => navigate(section.link)}
        >
          Shoppa nu
        </button>
      </div>
    </span>
  );
};
