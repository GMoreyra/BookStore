import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import CartList from "./components/Cart/CartList";
import ItemListContainer from "./container/ItemListContainer";
import ItemList from "./components/Item/ItemList";
import ItemDetail from "./components/Item/ItemDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemList />} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
