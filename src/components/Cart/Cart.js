import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.amount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const addHandler = () => {
    console.log("added");
  };
  const removeHandler = () => {
    console.log("removed");
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          price={item.price}
          key={item.id}
          amount={item.amount}
          onAdd={addHandler.bind(null,item)}
          onRemove={removeHandler.bind(null,item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
