import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartWidget from "../components/Cart/CartWidget";
import { getAllData } from "../firebase";

const Navbar = () => {
  const [categoriesState, setCategoriesState] = useState([]);
  const cart = useContext(CartContext);
  const cartIsEmpty = cart.cart.length < 1;

  useEffect(() => {
    const response = getAllData("categories");
    response.then((x) => {
      setCategoriesState(x);
    });
  }, []);

  return (
    <div id="navbar">
      <NavLink to={"/"} className="text-white">
        Book-Store
      </NavLink>
      <div
        className={
          cartIsEmpty
            ? "navbar-categories-noCart"
            : "navbar-categories-withCart"
        }
      >
        {categoriesState.map((c) => (
          <div className="text-white" key={c.id}>
            <NavLink className="text-white" to={`/category/${c.id}`}>
              {c.name}
            </NavLink>
          </div>
        ))}
        {!cartIsEmpty && <CartWidget />}
      </div>
    </div>
  );
};

export default Navbar;
