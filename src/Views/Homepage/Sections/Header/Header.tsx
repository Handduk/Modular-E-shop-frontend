import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [init, setInit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setInit(true), 300);
  });
  return (
    <div className="h-screen w-screen overflow-hidden">
      <img
        src="public\IMG\CS_Rosteriet_7okt_2020.jpg"
        alt="product"
        className="h-full w-full
                       object-cover
                       object-center
                       md:object-[25%_35%]"
      />
      <div
        className={`absolute flex flex-col items-center w-full h-full 
                          max-md:top-1/2 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/6
                          md:top-0 md:left-0 md:justify-center ${
                            init ? "opacity-100" : "opacity-0"
                          } transition-all duration-300`}
      >
        <div className="mb-4">
          <h1 className="text-white !font-semibold text-center md:!text-6xl">
            Närrostat och därodlat
          </h1>
        </div>
        <div>
          <button
            className="p-4 text-main-color font-semibold bg-black/50 !rounded-sm
                hover:bg-white/50 hover:text-secondary-color
                transition-all duration-200
              md:p-6 md:text-lg lg:p-8 lg:!text-xl"
            onClick={() => navigate("/shop")}
          >
            Till våra produkter
          </button>
        </div>
      </div>
    </div>
  );
};
