import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../../Context/ProductContext";

export const CategorySection = () => {
  const { categorys } = useProduct();
  const navigate = useNavigate();
  return (
    <span className="w-full flex flex-wrap justify-center mb-6 pr-4">
      {categorys &&
        categorys.map((cat, index) => (
          <div className="w-6/12 pl-4 pb-4" key={index}>
            <div className="h-[175px] border border-secondary-color rounded-[2.5px] border-solid">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="h-full w-full object-cover cursor-pointer rounded-[5px]"
                onClick={() => navigate(`shop/${cat.name.toLowerCase()}`)}
              />
            </div>
            <div className="flex justify-center mb-2">
              <a
                href={`/shop/${cat.name.toLowerCase()}`}
                className="!no-underline !text-secondary-color border-b border-secondary-color"
              >
                {cat.name}
              </a>
            </div>
          </div>
        ))}
    </span>
  );
};
