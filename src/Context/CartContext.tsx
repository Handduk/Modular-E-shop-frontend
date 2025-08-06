import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../Components/ShoppingCart/ShoppingCart";
import { Product } from "../Models/Product";
import { Variant } from "../Models/Variant";
import { CartItem } from "../Models/Cart";

interface CartProviderProps {
  children: ReactNode;
}

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  setCartQuantity: (
    product: Product,
    option: string | null,
    variant: Variant | null,
    value: number
  ) => void;
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
  const [shoppingCartItems, setShoppingCartItems] = useState<CartItem[]>([]);

  const cartQuantity = shoppingCartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
    console.log(
      "Setting cart quantity for product:",
      product.name,
      "with value:",
      value
    );
    console.log(shoppingCartItems);
    setShoppingCartItems((currItems) => {
      if (
        currItems.find(
          (item) =>
            item.product.id === product.id &&
            item.option === option &&
            item.variant?.id === variant?.id
        ) == null
      ) {
        return [
          ...currItems,
          {
            product: product,
            option: option,
            variant: variant,
            quantity: value,
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
        getItemQuantity,
        setCartQuantity,
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
