import { Product } from "../../Models/Product";
import { getSalesPrice } from "../../Handlers/SalesPrice";
import { useNavigate } from "react-router-dom";

interface ProductPostsProps {
  products: Product[];
}

export const ProductPosts = ({ products }: ProductPostsProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-1/2 flex flex-wrap pr-4">
      {products &&
        products.map((res) => (
          <div className="w-1/2 h-fit pl-4 pb-4 md:w-1/3 lg:w-1/4" key={res.id}>
            <img
              src={res.images[0]}
              alt={res.name}
              className="h-52 w-full object-cover rounded-[2px] cursor-pointer 
               md:h-72 lg:w-10/12 lg:h-96"
              onClick={() => navigate(`/product?id=${res.id}`)}
            />
            <div className="font-semibold text-neutral-950 dark:text-dark-secondary-color">
              <div className="flex">{res.name}</div>
              <div className="flex">
                {res.discount ? (
                  <>
                    <p className="text-red-500">
                      {getSalesPrice(res.price, res.discount).toFixed(2)} kr
                    </p>
                    <p className="text-neutral-600 line-through ml-2">
                      {" "}
                      {`${res.price.toFixed(2)} kr`}
                    </p>
                  </>
                ) : (
                  `från ${res.price.toFixed(2)} kr`
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
