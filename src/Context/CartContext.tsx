import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ShoppingCart } from "../Components/ShoppingCart/ShoppingCart";
import { Product } from "../Models/Product";
import { Variant } from "../Models/Variant";
import { CartItem } from "../Models/Cart";
import { getProductImage } from "../Hooks/Products/ProductHooks";
import { getStorage, setStorage } from "../Hooks/localstorage";

interface CartProviderProps {
  children: ReactNode;
}

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartPopup: () => void;
  getItemQuantity: (id: number) => number;
  setCartQuantity: (
    product: Product,
    option: string | null,
    variant: Variant | null,
    value: number
  ) => void;
  updateCartQuantity: (item: CartItem, value: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (item: CartItem) => void;
  cartQuantity: number;
  shoppingCartItems: CartItem[];
  isOpen: boolean;
};

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shoppingCartItems, setShoppingCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = getStorage("shoppingCart");
      return storedCart ? storedCart : [];
    } catch (error) {
      console.error("Failed to parse shopping cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    setStorage("shoppingCart", shoppingCartItems);
  }, [shoppingCartItems]);

  const cartQuantity = shoppingCartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartPopup = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  };

  const getItemQuantity = (id: number) => {
    return (
      shoppingCartItems.find((item) => item.product.id === id)?.quantity || 0
    );
  };

  const setCartQuantity = (
    product: Product,
    option: string | null,
    variant: Variant | null,
    value: number
  ) => {
    if (!product) return;
    if (product.variants && variant === null) {
      window.alert("Välj en storlek innan du lägger till i varukorgen");
      return;
    }
    const productImage = getProductImage(product, option);
    setShoppingCartItems((currItems) => {
      if (
        currItems.find(
          (item) =>
            item.product.id === product.id &&
            item.option === option &&
            item.variant?.id === variant?.id &&
            item.productImage === productImage
        ) == null
      ) {
        return [
          ...currItems,
          {
            product: product,
            option: option,
            variant: variant,
            quantity: value,
            productImage: productImage,
          },
        ];
      } else {
        return currItems.map((item) => {
          const isSameProduct =
            item.product.id === product.id &&
            variant?.id === item.variant?.id &&
            option === item.option;
          if (isSameProduct) {
            if (item.quantity !== value) {
              return { ...item, quantity: item.quantity + value };
            }
            return item;
          }
          return item;
        });
      }
    });
  };

  const updateCartQuantity = (item: CartItem, value: number) => {
    setShoppingCartItems((prevItems) =>
      prevItems.map((i) => {
        const isSameItem =
          i.product.id === item.product.id &&
          i.option === item.option &&
          i.variant?.id === item.variant?.id;
        return isSameItem ? { ...i, quantity: value } : i;
      })
    );
  };

  const decreaseCartQuantity = (id: number) => {
    setShoppingCartItems((currItems) => {
      if (currItems.find((item) => item.product.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.product.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (item: CartItem) => {
    setShoppingCartItems((currItems) => {
      return currItems.filter((curr) => {
        const isSameProduct = curr.product.id === item.product.id;
        const isSameOption = curr.option === item.option;
        const isSameVariant = curr.variant?.id === item.variant?.id;

        const isSameItem = isSameProduct && isSameOption && isSameVariant;
        return !isSameItem;
      });
    });
  };
  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
        cartPopup,
        getItemQuantity,
        setCartQuantity,
        updateCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        shoppingCartItems,
        isOpen,
      }}
    >
      {children}
      <ShoppingCart />
    </CartContext.Provider>
  );
};
