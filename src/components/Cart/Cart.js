import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartContext = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const totalAmount = `$${cartContext.amount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const addHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const removeHandler = (id) => {
    cartContext.deleteItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          price={item.price}
          key={item.id}
          amount={item.amount}
          onAdd={addHandler.bind(null, item)}
          onRemove={removeHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const orderingHandler = () => {
    setIsCheckOut(true);
  };
  return (
    <Modal onClose={props.onClose}>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onCancel ={props.onClose} />}
      {!isCheckOut && (
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && (
            <button onClick={orderingHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}

export default Cart;
