import React from "react";
import classes from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

function HeaderCardButton(props) {

  const cartContext = useContext(CartContext);
  
  const noOfItems = cartContext.items.reduce((currentNo,item)=>{
    return (currentNo) + (+item.amount);
  },0);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}  >
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
}

export default HeaderCardButton;
