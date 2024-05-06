import { Form } from "react-bootstrap";
import { categoryList } from "../../../Views/Homepage/Sections/CategorySection/CategorySection";
import "./NavbarMenu.css";
import { useNavigate } from "react-router-dom";

interface menuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarMenu = ({ show, setShow }: menuProps) => {
  const navigate = useNavigate();
  return (
    <div className={`container-navmenu ${show ? "show" : ""}`}>
      <Form className="form-navmenu">
        <Form.Group className="formGroup-navmenu">
          {categoryList &&
            categoryList.map((res, index) => (
              <Form.Label
                className="category-navmenu"
                key={index}
                onClick={() => {
                  navigate(res.link);
                  setShow(false);
                }}
              >
                {res.name}
              </Form.Label>
            ))}
        </Form.Group>
      </Form>
    </div>
  );
};
