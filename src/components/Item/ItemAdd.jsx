import React, { useState } from "react";

const ItemAdd = ({ onEvent }) => {
  const [count, setCount] = useState(1);

  let incrementCount = () => {
    setCount(count + 1);
  };

  let decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <p>Cantidad: {count}</p>
      <div>
        <button onClick={decrementCount}> - </button>
        <button onClick={incrementCount}> + </button>
      </div>
      <button className="buyBtn" onClick={() => onEvent(count)}>
        Comprar
      </button>
    </div>
  );
};

export default ItemAdd;
