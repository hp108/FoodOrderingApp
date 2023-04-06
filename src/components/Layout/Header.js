import React from 'react'
import headerImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCardButton from './HeaderCardButton'

function Header(props) {
  return (
    <div>
        <header className={classes.header}  >
            <h1>React Meals</h1>
            <HeaderCardButton onClick={props.onShowCart}  />
        </header>
        <div className={classes['main-image']}>
        <img src={headerImage} alt="delicious food" />
        </div>
        
    </div>
  )
}

export default Header