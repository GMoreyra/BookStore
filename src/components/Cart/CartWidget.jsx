import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function CartWidget() {
  const cart = useContext(CartContext);
  const cartSize = cart.cart.reduce((a, b) => ({
    quantity: a.quantity + b.quantity,
  }));

  return (
    <NavLink to={"/cart"} className="text-white">
      <div className="cartIconContainer">
        <ShoppingCartIcon /> {cartSize.quantity}
      </div>
    </NavLink>
  );
}
