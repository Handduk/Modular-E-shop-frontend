import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../Components/ShoppingCart/ShoppingCart";

interface CartProviderProps {
  children: ReactNode;
}

type ShoppingCart = {
  id: number;
  categoryId: number;
  quantity: number;
};

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  setCartQuantity: (id: number, categoryID: number, value: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  shoppingCartItems: ShoppingCart[];
};

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCart[]>(
    []
  );

  const cartQuantity = shoppingCartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    return shoppingCartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const setCartQuantity = (id: number, categoryID: number, value: number) => {
    setShoppingCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, categoryId: categoryID, quantity: value }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + value };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setShoppingCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setShoppingCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
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
      }}
    >
      {children}
      <ShoppingCart open={isOpen} />
    </CartContext.Provider>
  );
};
