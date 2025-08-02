import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productApi";
import { Product } from "../Models/Product";
import { Category } from "../Models/Category";
import { getAllCategorys } from "../services/categoryApi";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  categorys: Category[];
  setCategorys: (categorys: Category[]) => void;
  mainPageProduct: Product | null;
  setMainPageProduct: (product: Product | null) => void;
  searchForProduct: (searchTerm: string) => void;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [mainPageProduct, setMainPageProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategorys = async () => {
    try {
      const response = await getAllCategorys();
      setCategorys(response);
    } catch (error) {
      console.error("Error fetching categorys", error);
    }
  };

  const searchForProduct = (searchTerm: string) => {
    if (!searchTerm) {
      console.warn("Search term is empty");
      return;
    }
    const product = products.find((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMainPageProduct(product || null);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategorys();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        categorys,
        setCategorys,
        mainPageProduct,
        setMainPageProduct,
        fetchProducts,
        searchForProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
