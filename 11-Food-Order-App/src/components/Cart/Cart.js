import React, { useContext } from "react";

import CartContext from "./../../store/cart-context";
import Modal from "./../UI/Modal";
import CartItem from './CartItem'
import classes from "./Cart.module.css";

const Cart = (props) => {
   const cartCtx = useContext(CartContext);
   console.log("🚀 ~ file: Cart.js ~ line 10 ~ Cart ~ cartCtx", cartCtx)

   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
   const hasItems = cartCtx.items.length > 0
   
   const addCartItemHandler = (item) => {
      cartCtx.addItem({...item, amount: 1})
   }
   
   const removeCartItemHandler = (id) => {
      cartCtx.removeItem(id)
   }

   const cartItems = (
      <ul className={classes["cart-items"]}>
         {cartCtx.items.map((item) => (
            <CartItem
               key={item.id}
               name={item.name}
               price={item.price}
               amount={item.amount}
               onAdd={addCartItemHandler.bind(null, item)}
               onRemove={removeCartItemHandler.bind(null, item.id)}
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
            <button className={classes["button--alt"]} onClick={props.onClose}>
               Close
            </button>
            {hasItems && <button className={classes.button}>Order</button>}
         </div>
      </Modal>
   );
};

export default Cart;
