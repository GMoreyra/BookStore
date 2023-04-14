import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { addNewOrder } from "../../firebase";

const CartInput = ({ totalPrice }) => {
  const cart = useContext(CartContext);
  const [nameInput, setNameInput] = useState("");
  const [validNameInput, setValidNameInput] = useState(true);
  const [lastnameInput, setLastnameInput] = useState("");
  const [validLastnameInput, setValidLastnameInput] = useState(true);
  const [phoneInput, setPhoneInput] = useState("");
  const [validPhoneInput, setValidPhoneInput] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [emailRepeatedInput, setEmailRepeatedInput] = useState("");
  const [emailMessageText, setEmailMessageText] = useState("");
  const [validEmailInput, setValidEmailInput] = useState(true);
  const [idOrder, setIdOrder] = useState("");

  function makePurchase() {
    setAllValid();
    let validInputs = true;
    if (nameInput === "") {
      setValidNameInput(false);
      validInputs = false;
    }
    if (lastnameInput === "") {
      setValidLastnameInput(false);
      validInputs = false;
    }
    if (phoneInput === "") {
      setValidPhoneInput(false);
      validInputs = false;
    }
    if (emailInput === "") {
      setEmailMessageText("Ingrese un email");
      setValidEmailInput(false);
      validInputs = false;
    } else if (
      emailInput !== emailRepeatedInput ||
      !(
        /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput) &&
        /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailRepeatedInput)
      )
    ) {
      setEmailMessageText("Email invalido");
      setValidEmailInput(false);
      validInputs = false;
    }
    if (validInputs) {
      const order = {
        email: emailInput,
        name: nameInput,
        lastname: lastnameInput,
        phone: phoneInput,
        total: totalPrice,
        date: new Date(),
        items: cart.cart,
      };
      const response = addNewOrder(order);
      response.then((x) => {
        setIdOrder(x.id);
      });
    }
  }

  function setAllValid(){
    setValidNameInput(true);
    setValidLastnameInput(true);
    setValidPhoneInput(true);
    setValidEmailInput(true);
  }

  return (
    <div className="cartInput">
      <h2>✨ Checkout ✨</h2>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <div>
          <TextField
            required
            error={validNameInput === false ? true : false}
            id="outlined-required"
            label="Nombre"
            value={nameInput}
            helperText={validNameInput === false ? "Ingrese un nombre" : ""}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <TextField
            required
            error={validLastnameInput === false ? true : false}
            id="outlined-required"
            label="Apellido"
            value={lastnameInput}
            helperText={
              validLastnameInput === false ? "Ingrese un apellido" : ""
            }
            onChange={(e) => setLastnameInput(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            error={validPhoneInput === false ? true : false}
            id="outlined-number"
            label="Telefono"
            value={phoneInput}
            helperText={validPhoneInput === false ? "Ingrese un telefono" : ""}
            onChange={(e) => setPhoneInput(e.target.value)}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            required
            error={validEmailInput === false ? true : false}
            id="outlined-required"
            label="Email"
            value={emailInput}
            helperText={emailMessageText}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <TextField
            required
            error={validEmailInput === false ? true : false}
            id="outlined-required"
            label="Email"
            value={emailRepeatedInput}
            helperText={emailMessageText}
            onChange={(e) => setEmailRepeatedInput(e.target.value)}
          />
        </div>
        <button className="buyBtn" onClick={makePurchase}>
          Realizar compra
        </button>
      </Box>
      {idOrder !== "" && (
        <h3 className="cartInput">✅ Compra realizada con id: {idOrder}</h3>
      )}
    </div>
  );
};

export default CartInput;
