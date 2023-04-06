import React from "react";

const CartContext= React.createContext({
  items: [],
  amount: 0,
  addItem: (item) => {},
  deleteItem: (id) => {},
});

export default CartContext;