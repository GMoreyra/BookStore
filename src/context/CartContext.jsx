import React, { createContext, useState } from "react";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(obj) {
    if (isInCart(obj.item)) {
      let objIndex = cart.findIndex((x) => x.id === obj.item.id);
      cart[objIndex].quantity += obj.quantity;
    } else {
      obj.item.quantity = obj.quantity;
      setCart([...cart, obj.item]);
    }
  }

  function removeItem(quantity, id) {
    let objIndex = cart.findIndex((x) => x.id === id);
    cart[objIndex].quantity -= quantity;
    setCart([...cart]);
    if (cart[objIndex].quantity < 1) {
      let cartFiltered = cart.filter((x) => x.id !== id);
      setCart(cartFiltered);
    }
  }

  function isInCart(obj) {
    return cart.find((x) => x.id === obj.id);
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
