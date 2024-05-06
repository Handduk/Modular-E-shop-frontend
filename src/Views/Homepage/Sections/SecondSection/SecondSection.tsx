import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Section, sectionData } from "../../../../Models/Section";
import "../SecondSection/SecondSection.css";

export const SecondSection = () => {
  const [section, setSection] = useState<Section>(sectionData[1]);

  const navigate = useNavigate();
  return (
    <span className="section-section section-secondSection">
      <Image
        src={section.img}
        fluid
        className="img-section"
        onClick={() => navigate("/coffee")}
      />
      <span className="textArea-section textArea-secondSection">
        <div
          className="header-section header-secondSection"
          onClick={() => navigate(section.link)}
        >
          {section.header}
        </div>
        <div className="text-section text-secondSection">{section.text}</div>
      </span>
      <div className="btnGroup-section">
        <Button
          variant="light"
          className="btn-section"
          onClick={() => navigate(section.link)}
        >
          Shoppa nu
        </Button>
      </div>
    </span>
  );
};
