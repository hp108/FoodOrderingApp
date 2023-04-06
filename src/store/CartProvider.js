import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  TotalAmount: 0,
};

const cartReducer = (state, action) => {
 
  if (action.type === "ADD") {
    const updatedTotalAmount  = (+state.TotalAmount) + (+action.item.price) * (+action.item.amount); 
    const existingItemId = state.items.find((item) =>{
    return action.item.id === item.id
    } )
    let updatedItems = [...state.items];
    if(existingItemId)
    { 
      existingItemId.amount = existingItemId.amount + action.item.amount;
    }
    else{
       updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      TotalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DELETE") {
    
    const existingItem = state.items.find(item =>{
      return item.id === action.id
    })
    let updatedItems = state.items;
    const updatedTotalAmount = state.TotalAmount - existingItem.price;
    existingItem.amount-=1
    if(existingItem.amount <= 0)
    {
      updatedItems= state.items.filter(item =>{
        return item.id !== existingItem.id
      })
    }
    return {
      items: updatedItems,
      TotalAmount: updatedTotalAmount
    }
  }
  return defaultState;
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
