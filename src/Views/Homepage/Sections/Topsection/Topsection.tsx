import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Section, sectionData } from "../../../../Models/Section";
import "../Sections.css";

export const Topsection = () => {
  const [section, setSection] = useState<Section>(sectionData[0]);

  const navigate = useNavigate();

  const getInfoLink = () => {
    const infoLink = section.link.split("/")[1];
    navigate(`/${infoLink}`);
  };
  return (
    <>
      <span className="section-section">
        <Image
          src={section.img}
          fluid
          className="img-section"
          onClick={() => navigate("/coffee")}
        />
        <span className="textArea-section">
          <div
            className="header-section"
            onClick={() => navigate(section.link)}
          >
            {section.header}
          </div>
          <div className="text-section">{section.text}</div>
        </span>
        <div className="btnGroup-section">
          <Button
            variant="outline-dark"
            className="btn-section"
            onClick={() => getInfoLink()}
          >
            Läs mer
          </Button>
          <Button
            variant="dark"
            className="btn-section"
            onClick={() => navigate(section.link)}
          >
            Handla kaffe
          </Button>
        </div>
      </span>
    </>
  );
};
