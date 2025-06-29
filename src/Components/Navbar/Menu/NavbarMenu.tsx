import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../../../Context/ProductContext";

interface menuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarMenu = ({ show, setShow }: menuProps) => {
  const { categorys } = useProduct();
  const navigate = useNavigate();
  return (
    <div
      className={`bg-main-color z-50 w-2/3 h-screen fixed top-0 overflow-hidden transition-all duration-200 ease-linear left-0
     ${
       show
         ? "opacity-100 pointer-events-auto"
         : "opacity-0 pointer-events-none"
     }`}
    >
      <ul className="h-full flex flex-col items-stretch !pl-0">
        <div className="absolute flex flex-row justify-end w-full">
          <FontAwesomeIcon
            className="text-2xl p-4 cursor-pointer"
            icon={faX}
            onClick={() => setShow(!show)}
          />
        </div>
        <div className="flex flex-col text-3xl font-semibold ml-4 mr-0 mt-4 mb-0 w-fit z-50">
          {categorys &&
            categorys.map((res, index) => (
              <li
                className="pb-4 cursor-pointer"
                key={index}
                onClick={() => {
                  navigate("shop/" + res.name.toLowerCase());
                  setShow(false);
                }}
              >
                {res.name}
              </li>
            ))}
        </div>
        <div className="w-full mt-auto text-xl mb-4 mx-4 font-semibold">
          <li className="">
            Återförsäljare? <br />
            <span
              className="underline underline-offset-4 cursor-pointer"
              onClick={() => {
                navigate("/login");
                setShow(false);
              }}
            >
              Logga in här
            </span>
          </li>
        </div>
      </ul>
    </div>
  );
};
