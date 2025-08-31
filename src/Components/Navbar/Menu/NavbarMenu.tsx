import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../../../Context/ProductContext";
import { useEffect, useRef } from "react";

interface menuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarMenu = ({ show, setShow }: menuProps) => {
  const { categorys } = useProduct();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        show &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, setShow]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ease-linear ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/15" />
      <div
        ref={menuRef}
        className={`absolute top-0 left-0 h-screen bg-main-color w-2/3 md:w-1/3 shadow-xl 
          transform transition-transform duration-300 ease-in-out dark:bg-dark-main-color dark:text-dark-secondary-color
          ${show ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="h-full flex flex-col items-stretch !pl-0">
          <div className="absolute flex flex-row justify-end w-full">
            <FontAwesomeIcon
              className="text-2xl p-4 cursor-pointer"
              icon={faX}
              onClick={() => setShow(false)}
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

          <div className="w-full mt-auto text-xl my-14 mx-4 font-semibold">
            <div>
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
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
