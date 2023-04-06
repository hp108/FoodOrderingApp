import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  TotalAmount: 0,
};

const cartReducer = (state, action) => {
 

  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedAmount = (+state.TotalAmount) + (+action.item.price) * (+action.item.amount);
    return {
      items: updatedItems,
      TotalAmount: updatedAmount,
    };
  }

  if (action.type === "DELETE") {
    // You need to write code to delete an item from the cart
    return state;
  }

  return state;
};

function CartProvider(props) {
  const [state, dispatchCart] = useReducer(cartReducer, defaultState);
  const onAddItem = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const onDeleteItem = (id) => {
    dispatchCart({ type: "DELETE", id: id });
  };

  const cartContext = {
    items: state.items,
    amount: state.TotalAmount,
    addItem:onAddItem,
    deleteItem: onDeleteItem
  };


  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
