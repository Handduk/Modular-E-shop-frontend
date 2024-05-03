import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const placeholderText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto alias atque ad perferendis id in ullam accusamus eum quis dignissimos ipsum dolorum recusandae sapiente nihil numquam commodi, aliquid perspiciatis.";

export const Topsection = () => {
  const [sectionImg, setSectionImg] = useState<string>("IMG/produkt.jpg");
  const [headerText, setHeaderText] = useState<string>("VÅRENS KAFFE");
  const [contentText, setContentText] = useState<string>(placeholderText);
  const navigate = useNavigate();
  return (
    <>
      <span className="mainSection-home">
        <Image
          src={sectionImg}
          fluid
          className="mainSection-img-home"
          onClick={() => navigate("/coffee")}
        />
        <span className="mainSection-textArea-home">
          <div className="mainSection-header-home">{headerText}</div>
          <div className="mainSection-text-home">{contentText}</div>
        </span>
        <div className="mainSection-btnGroup-home">
          <Button
            variant="outline-dark"
            className="mainSection-btn-home"
            href="/coffee"
          >
            Läs mer
          </Button>
          <Button
            variant="dark"
            className="mainSection-btn-home"
            href="/shop/coffee"
          >
            Handla kaffe
          </Button>
        </div>
      </span>
    </>
  );
};
