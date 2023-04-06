import React from "react";
import classes from './MealItemForm.module.css'
import { useRef } from "react";
import INput from "../../UI/INput";

function MealItemForm(props) {

  const itemRef =useRef();
  
  const onSubmitHandler = (event) =>{
    event.preventDefault();
    const enteredAmount = +(itemRef.current.value);
    props.addToCart(enteredAmount);
  }

  return (
    <form className={classes.form} onSubmit={onSubmitHandler} >
      <INput label='amount' ref={itemRef}  input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}  />

      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
