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
          <div
            className=" w-6/12 h-full cursor-pointer pl-4 pb-4"
            key={res.id}
            onClick={() => navigate(`/product?id=${res.id}`)}
          >
            <img
              src={res.img[0]}
              alt={res.name}
              className="h-full w-full object-cover rounded-[2px]"
            />
            <div className="font-semibold text-neutral-950">
              <div className="flex">{res.name}</div>
              <div className="flex">
                {res.sale ? (
                  <>
                    <p className="text-red-500">
                      {getSalesPrice(res.price, res.sale).toFixed(2)} kr
                    </p>
                    <p className="text-neutral-600 line-through ml-2">
                      {" "}
                      {`${res.price.toFixed(2)} kr`}
                    </p>
                  </>
                ) : (
                  `${res.price.toFixed(2)} kr`
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
