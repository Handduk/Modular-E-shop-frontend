import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../../Context/ProductContext";

export const CategorySection = () => {
  const { categorys } = useProduct();
  const navigate = useNavigate();
  return (
    <section
      className={`w-full mb-6 pr-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
        categorys.length <= 3 && "lg:flex lg:flex-row justify-center"
      }`}
    >
      {categorys &&
        categorys.map((cat, index) => (
          <div className="w-full pl-4 pb-4" key={index}>
            <div
              className="h-[175px] border border-secondary-color rounded-[2.5px] border-solid
            md:h-[250px] lg:h-[400px] dark:!border-0"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover cursor-pointer rounded-[5px]"
                onClick={() => navigate(`shop/${cat.name.toLowerCase()}`)}
              />
            </div>
            <div className="flex justify-center mb-2">
              <div
                onClick={() => navigate(`/shop/${cat.name.toLowerCase()}`)}
                className="text-secondary-color font-semibold cursor-pointer mt-2 lg:text-2xl dark:text-dark-secondary-color"
              >
                {cat.name}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};
