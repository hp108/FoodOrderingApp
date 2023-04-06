import React from "react";
import classes from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext,useState,useEffect } from "react";
import CartContext from "../../store/cart-context";

function HeaderCardButton(props) {

  const [btn,setBtn]= useState(false)

  const cartContext = useContext(CartContext);
  const noOfItems = cartContext.items.reduce((currentNo,item)=>{
    return (currentNo) + (+item.amount);
  },0);
  
  useEffect(()=>{
    if(cartContext.items <=0)
    {
      return;
    }
    setBtn(true)
    setTimeout(()=>{
      setBtn(false)
    },300)
  },[cartContext.items])

  const button = `${classes.button} ${btn && classes.bump}`
  return (
    <button onClick={props.onClick} className={button}>
      <span className={classes.icon}  >
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
}

export default HeaderCardButton;
