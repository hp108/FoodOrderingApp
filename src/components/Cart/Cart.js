import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [error,setError] = useState(null)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [didSubmit,setDidSubmit] = useState(false)
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
  const orderingHandler = () => {
    setIsCheckOut(true);
  };
  const submitHandler = async (userdata) =>{
    setIsSubmitting(true)
    try{
      
    const response = await fetch('https://react-http-afbd9-default-rtdb.firebaseio.com/orders.json',{
      method: "POST",
      body : JSON.stringify({
        user : userdata,
        orderedItems : cartContext.items
      })
    })
    if(!response.ok)
      {
        setIsSubmitting(true);
        throw new Error("sorry something went wrong")
      }
    setIsSubmitting(false)
    setDidSubmit(true)
  }catch(error)
  {
    const errorMessage = error.message
    setError(error.message)
  }
  }

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

  const cartModalContent = <div className={classes.main}  >{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckOut && <Checkout onConfirm ={submitHandler} onCancel ={props.onClose} />}
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
  </div>
  const isSubmittingModalContent = <p>sending the order...</p>
    const didSubmitModalContent = <p>Sucessfully send the order!</p>
    const errorMessage = error;


  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !error && cartModalContent}
      {isSubmitting && !error &&isSubmittingModalContent}
      {!isSubmitting && !error &&didSubmit && didSubmitModalContent}
      {error && errorMessage}
    </Modal>
  );
}

export default Cart;