import React, { useContext, useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import ItemAdd from "./ItemAdd";
import { getSpecificItem } from "../../firebase";

const ItemDetail = (item) => {
  const { itemId } = useParams();
  const cart = useContext(CartContext);
  const [showButtonCount, setShowButtonCount] = useState(true);
  const [showButtonShop, setShowButtonShop] = useState(false);
  const [foundItem, setFoundItem] = useState(true);
  const [bookItem, setBookItem] = useState({});

  useEffect(() => {
    if (itemId !== undefined) {
      const response = getSpecificItem("itemList", itemId);
      response.then((x) => {
        if (x === undefined) setFoundItem(false);
        setBookItem(x);
      });
    } else {
      setBookItem(item.item);
    }
  }, [item, itemId]);

  function onAdd(quantityToAdd) {
    setShowButtonCount(false);
    setShowButtonShop(true);
    cart.addItem({ item: bookItem, quantity: quantityToAdd });
  }

  return (
    <>
      {foundItem ? (
        <div className="bookItem" key={bookItem.id}>
          <img
            src={`/assets/img/${bookItem.pictureUrl}`}
            alt={bookItem.title}
          />
          <h4>{bookItem.title}</h4>
          <p>Autor: {bookItem.author}</p>
          <p>Editorial: {bookItem.editorial}</p>
          <p>Tipo: {bookItem.type}</p>
          <p>{`Precio: AR$ ${bookItem.price}`}</p>
          {itemId !== undefined && showButtonCount && (
            <ItemAdd onEvent={onAdd} />
          )}
          {showButtonShop && (
            <NavLink to={"/cart"}>
              <button className="buyBtn">Terminar compra</button>
            </NavLink>
          )}
        </div>
      ) : (
        <div className="positionFixedCenter">
          <h2>{`🥺 No se encontro el item con id: ${itemId} 🥺`}</h2>
        </div>
      )}
    </>
  );
};

export default ItemDetail;
