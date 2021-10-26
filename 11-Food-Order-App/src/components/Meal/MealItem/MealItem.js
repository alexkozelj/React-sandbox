import { useContext } from 'react'

import CartContext from './../../../store/cart-context'
import MealItemForm from './MealItemForm'
import classes from './MealItem.module.css'

const MealItem = (props) => {
   const price = `$${props.price.toFixed(2)}`
   const cartCtx = useContext(CartContext)

   const addToCartHandler = (amount) => {
   console.log("🚀 ~ file: MealItem.js ~ line 12 ~ addToCartHandler ~ amount", amount)
      cartCtx.addItem({
         id: props.id,
         name: props.name,
         description: props.description,
         price: props.price.toFixed(2),
         amount: amount
      })
   }
   return (
      <li key={props.id} className={classes.meal}>
         <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
         </div>
         <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
         </div>
      </li>
   );
};

export default MealItem;
