import {useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [name, setName] = useState('')
  const [street,setStreet] = useState('')
  const [postalCode,setPostalCode] = useState('')
  const [city,setCity]= useState('')

  const [formInputValidity,setFormInputValidity] = useState({
    name : true,
    street : true,
    postalCode : true,
    city : true
  })

  const isEmpty = (data)=>{
    return data === ''
  }
  const isSixChars = (data) =>{
      return data.trim().length === 6;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    setCity(cityInputRef.current.value); 
    setName(nameInputRef.current.value);
    setPostalCode(postalInputRef.current.value);
    setStreet(streetInputRef.current.value)
    const nameIsValid = !isEmpty(nameInputRef.current.value);
    const streetIsValid = !isEmpty(streetInputRef.current.value);
    const postalIsValid = isSixChars(postalInputRef.current.value);
    const cityIsValid = !isEmpty(cityInputRef.current.value)   
    const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    setFormInputValidity({
      name : !isEmpty(nameInputRef.current.value),
      street : !isEmpty(streetInputRef.current.value),
      postalCode : isSixChars(postalInputRef.current.value),
      city : !isEmpty(cityInputRef.current.value)
    }) 
    console.log(formInputValidity)
    if(!formIsValid)
    {
      return ;
    }
    console.log(name , city , street, postalCode)
  };

  const nameControlClass = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
  const streetControlClass = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
  const postalCodeControlClass = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`
  const cityControlClass = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' ref={nameInputRef} id='name' />
        {!formInputValidity.name && <p>please enter name</p> }
      </div>
      <div className={streetControlClass}>
        <label htmlFor='street'>Street</label>
        <input type='text' ref={streetInputRef} id='street' />
        {!formInputValidity.street &&  <p>please enter street</p> }
      </div>
      <div className={postalCodeControlClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' ref={postalInputRef} id='postal' />
        {!formInputValidity.postalCode && <p>please enter postal code</p> }
      </div>
      <div className={cityControlClass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>please enter city</p> }
      </div>
 
      <div className={classes.actions}>
        <button type='button'  onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;