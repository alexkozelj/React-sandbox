import { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon';
import CartContext from './../../store/cart-context'
import classes from './HeaderCartButton.module.css'


// import Cart from './../Cart/Cart';

const HeaderCartButton = props => {

   const [bumpClass, setBumpClass] = useState(false)
   const cartCtx = useContext(CartContext)
   const { items } = cartCtx
   
   const numberOfCartItems = items.reduce((curNumber, item) => {
      return curNumber + item.amount
   }, 0)

   useEffect(() => {
      if (items.length === 0) return
      setBumpClass(true)
      const timer = setTimeout(() => {
         setBumpClass(false)
      }, 300)

      return () => {
         clearTimeout(timer)
      }
   },[items])


   const btnClass = `${classes.button} ${bumpClass ? classes.bump : ''}`

   return (
      <>
      <button className={btnClass} onClick={props.onClick}>
         <span className={classes.icon}>
            <CartIcon/>
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
      </>
   )
}

export default HeaderCartButton