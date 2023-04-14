import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ItemDelete = ({ onEvent, quantity, id }) => {
  const [quantityDel, setQuantityDel] = useState(1);
  const [quantityDelMax, setQuantityDelMax] = useState(quantity);

  let incrementQuantity = () => {
    if (quantityDel < quantityDelMax) {
      setQuantityDel(quantityDel + 1);
    }
  };

  let decrementQuantity = () => {
    if (quantityDel > 1) {
      setQuantityDel(quantityDel - 1);
    }
  };

  return (
    <div>
      <p>Cantidad: {quantityDel}</p>
      <div>
        <button onClick={decrementQuantity}> - </button>
        <button onClick={incrementQuantity}> + </button>
      </div>
      <NavLink className="text-white" to={"/cart"}>
        <button
          className="buyBtn"
          onClick={() => {
            onEvent(quantityDel, id);
            setQuantityDelMax(quantityDelMax - quantityDel);
          }}
        >
          Eliminar
        </button>
      </NavLink>
    </div>
  );
};

export default ItemDelete;
