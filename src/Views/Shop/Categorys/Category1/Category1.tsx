import { useEffect, useState } from "react";
import { Category } from "../../../../Models/Category";
import { categoryList } from "../../../Homepage/Sections/CategorySection/CategorySection";
import { Product } from "../../../../Models/Product";
import { ProductPosts } from "../../../../Components/Products/ProductPosts";
import { PaginationMenu } from "../../../../Components/Products/PaginationMenu";
import "../Category.css";
import { Button, Form } from "react-bootstrap";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortProducts } from "../../../../Models/Register";

export const Category1 = () => {
  const [category, setCategory] = useState<Category>(categoryList[0]);
  const [products, setProducts] = useState<Product[]>(category.products);
  const [defaultSort, setDefaultSort] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prodPerPage, setProdPerPage] = useState<number>(10);

  const indexOfLastProd = currentPage * prodPerPage;
  const indexOfFirstProd = indexOfLastProd - prodPerPage;
  const currentProducts = products.slice(indexOfFirstProd, indexOfLastProd);

  const paginate = (pagenumber: number) => setCurrentPage(pagenumber);

  useEffect(() => {
    setDefaultSort([...products]);
  }, []);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sortedProducts = [...products];
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

    setProducts(sortedProducts);
  };

  return (
    <div className="contentBody">
      <div className="content">
        <div className="info-product">
          <div className="header-product">{category.name}</div>
          <div className="description-product">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            cumque quibusdam, impedit enim est voluptatum debitis iusto ex odio
            exercitationem, dolorum mollitia dignissimos iste ipsum delectus
          </div>
          <div className="totalProducts-product">
            {products.length} PRODUKTER
          </div>
          <div className="sortAndFilter-container-product">
            <div className="filter-product">
              <Button variant="outline-dark" className="filterBtn-product">
                Filtrera
                <FontAwesomeIcon
                  className="btn-icon-product"
                  icon={faBarsStaggered}
                />
              </Button>
            </div>
            <div className="sort-product">
              <Form.Select
                className="sort-select-product"
                onChange={(e) => handleSort(e)}
              >
                {SortProducts &&
                  SortProducts.map((res, index) => (
                    <option value={index} key={index}>
                      {res}
                    </option>
                  ))}
              </Form.Select>
            </div>
          </div>
        </div>
        <span className="products-product">
          <ProductPosts products={currentProducts} />
        </span>
        {products && products.length > 10 && (
          <div className="pageContainer-product">
            <PaginationMenu
              prodPerPage={prodPerPage}
              totalProducts={products.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        )}
      </div>
    </div>
  );
};
