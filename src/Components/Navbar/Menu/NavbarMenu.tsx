import { categoryList } from "../../../Views/Homepage/Sections/CategorySection/CategorySection";
import { useNavigate } from "react-router-dom";

interface menuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarMenu = ({ show, setShow }: menuProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-main-color z-50 w-[90vw] h-[calc(100vh-76px)] fixed overflow-y-hidden transition-all duration-200 ease-linear left-0
     ${
       show
         ? "opacity-100 pointer-events-auto"
         : "opacity-0 pointer-events-none"
     }`}
    >
      <ul className="h-full flex flex-col items-stretch !pl-0">
        <div className="flex flex-col text-3xl font-semibold ml-4 mr-0 mt-4 mb-0">
          {categoryList &&
            categoryList.map((res, index) => (
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
        <div className="w-full mt-auto text-2xl mb-4 mx-4 font-semibold">
          <li className="">
            Återförsäljare?{" "}
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
