import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Cart from "./Cart";
import CartInput from "./CartInput";

export default function CartList() {
  const cart = useContext(CartContext);
  const [finalPrice, setFinalPrice] = useState(0);
  const cartIsEmpty = cart.cart.length < 1;
  let cartPrice = 0;

  if (cart.cart.length === 1) {
    cartPrice = parseInt(cart.cart[0].price) * cart.cart[0].quantity;
  } else if (cart.cart.length > 1) {
    cartPrice = cart.cart.reduce(
      (a, b) => a + parseInt(b.price) * b.quantity,
      0
    );
  }
  if (cartPrice !== finalPrice) {
    setFinalPrice(cartPrice);
  }

  return (
    <>
      {cartIsEmpty ? (
        <div className="positionFixedCenter">
          <NavLink to={"/"} className="text-white">
            <button className="buyBtn">Ver lista de elementos</button>
          </NavLink>
        </div>
      ) : (
        <div className="cartContainer">
          <h2>🛒 Carrito 🛒</h2>
          {cart.cart.map((item) => (
            <Cart key={item.id} item={item} />
          ))}
          <h3>Precio total ${finalPrice}</h3>
          <CartInput totalPrice={finalPrice} />
        </div>
      )}
    </>
  );
}
