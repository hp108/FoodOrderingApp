import React from "react";
import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
    const price = `$${props.price.toFixed (2)}`
    const cartCtx=useContext(CartContext)
    
    

    const addHandler=(amount)=>{
      const items = {
        id: props.id,
        name: props.name,
        amount : amount,
        price: props.price
      }
          cartCtx.addItem(
            items
          )
    }
  return (
    <li className={classes.meal}>
      <div >
        <h3>{props.name}</h3>
      <div className={classes.description}  >{props.description}</div>
      <div className={classes.price}  >{price}</div>
      </div>
      <div>
          <MealItemForm addToCart={addHandler} id ={props.id} />
      </div>
    </li>
  );
}

export default MealItem;
