import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { getCategoryItems } from "../../firebase";

const ItemList = (items) => {
  const { categoryId } = useParams();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if (categoryId !== undefined) {
      const response = getCategoryItems(categoryId);
      response.then((x) => {
        setItemList(x);
      });
    } else {
      setItemList(items.itemList);
    }
  }, [items, categoryId]);
  
  return (
    <div className="bookContainer">
      {itemList.map((item) => (
        <div className="bookItem" key={item.id}>
          <NavLink className="text-black" to={`/item/${item.id}`}>
            <ItemDetail item={item} />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
