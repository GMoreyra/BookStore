import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ItemDelete from "../Item/ItemDelete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Cart = ({ item }) => {
  const cart = useContext(CartContext);
  const [cant, setCant] = useState(item.quantity);

  function onDelete(quantityToDelete, id) {
    let newCant = item.quantity - quantityToDelete;
    setCant(newCant);
    cart.removeItem(quantityToDelete, id);
  }

  return (
    <Card className="cartItem" key={item.id} sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={`/assets/img/${item.pictureUrl}`}
        alt={item.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <h4>{item.title}</h4>
          <p>{`Autor: ${item.author}`}</p>
          <p>{`Editorial: ${item.editorial}`}</p>
          <p>{`Tipo: ${item.type}`}</p>
          <p>{`Cantidad: ${cant}`}</p>
          <p>{`Precio Total: $${item.price * cant}`}</p>
        </CardContent>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <ItemDelete onEvent={onDelete} quantity={cant} id={item.id} />
      </Box>
    </Card>
  );
};

export default Cart;
