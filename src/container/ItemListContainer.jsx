import React, { useEffect, useState } from "react";
import ItemList from "../components/Item/ItemList";
import Loader from "react-loader-spinner";
import { getAllData } from "../firebase";

const ItemListContainer = () => {
  const [itemsState, setItemsState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = getAllData("itemList");
    response.then((x) => {
      setItemsState(x);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="positionFixedCenter">
          <Loader type="TailSpin" color="#000000" height={80} width={80} />
        </div>
      ) : (
        <ItemList itemList={itemsState} />
      )}
    </>
  );
};

export default ItemListContainer;
