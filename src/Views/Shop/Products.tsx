import { useEffect, useState } from "react";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation } from "react-router-dom";
import { Product } from "../../Models/Product";
import { useProduct } from "../../Context/ProductContext";
import { SortProducts } from "../../Models/Register";
import { ProductPosts } from "../../Components/Products/ProductPosts";
import { PaginationMenu } from "../../Components/Products/PaginationMenu";
import { Category } from "../../Models/Category";

export const Products = () => {
  const [defaultSort, setDefaultSort] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prodPerPage, setProdPerPage] = useState<number>(10);
  const { products, categorys } = useProduct();
  const [category, setCategory] = useState<Category>();
  const [prods, setProds] = useState<Product[]>(products);
  const location = useLocation();

  const getCategory = () => {
    const categoryPath = decodeURIComponent(location.pathname.split("/")[2]);
    const firstLetter = categoryPath?.charAt(0).toUpperCase();
    const restOfString = categoryPath?.slice(1);
    const fullCategoryName = firstLetter + restOfString;
    if (!categorys) return;
    setCategory(categorys.find((cat) => cat.name === fullCategoryName));
  };

  const getProducts = () => {
    if (!category) return;
    const filteredProducts = products.filter(
      (product) => product.categoryId === category.id
    );
    setProds(filteredProducts);
    setDefaultSort([...filteredProducts]);
  };

  const indexOfLastProd = currentPage * prodPerPage;
  const indexOfFirstProd = indexOfLastProd - prodPerPage;
  const currentProducts = prods?.slice(indexOfFirstProd, indexOfLastProd);

  const paginate = (pagenumber: number) => setCurrentPage(pagenumber);

  useEffect(() => {
    setDefaultSort([...prods]);
  }, []);

  useEffect(() => {
    getCategory();
    getProducts();
  }, [category, products, location.pathname]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    let sortedProducts = [...prods];
    switch (value) {
      case "0":
        //Recommended
        sortedProducts = [...defaultSort];
        break;
      case "1":
        //A-Z
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "2":
        //Z-A
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "3":
        //Lowest price first
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "4":
        //Highest price first
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProds(sortedProducts);
  };

  return (
    <div className="contentBody">
      <div className="content">
        <div className="w-full mb-6 px-3 pt-2">
          {category && (
            <div>
              <div className="text-3xl font-extrabold">{category?.name}</div>
              <div className="leading-[1.3] mb-2">{category?.description}</div>
            </div>
          )}
          <div className="text-neutral-800 text-[0.9rem] mb-2">
            {prods.length} <span>PRODUKTER</span>
          </div>
          <div className="flex flex-row justify-between">
            <div className="pr-2 flex items-center">
              <button className="flex items-center border border-black rounded-[1px] px-2 py-1">
                Filtrera
                <FontAwesomeIcon className="ml-4" icon={faBarsStaggered} />
              </button>
            </div>
            <div className="pl-2">
              <select
                name="sorting"
                id="sort"
                className="border rounded-[1px] border-black px-2 py-1"
                onChange={(e) => handleSort(e)}
              >
                {SortProducts &&
                  SortProducts.map((res, index) => (
                    <option value={index} key={index}>
                      {res}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <ProductPosts products={currentProducts} />
        {prods && prods.length > 10 && (
          <div>
            <PaginationMenu
              prodPerPage={prodPerPage}
              totalProducts={prods.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        )}
      </div>
    </div>
  );
};
