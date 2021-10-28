import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
   items: [],
   totalAmount: 0,
};

const cartReducer = (state, action) => {
   if (action.type === "ADD") {
      let updatedItems;

      const updatedTotalAmount =
         state.totalAmount + action.item.price * action.item.amount;

      if (state.items.some((item) => item.id === action.item.id)) {
         updatedItems = state.items.map(
            (item) =>
               item.id === action.item.id ? {
                  ...item,
                  amount: item.amount + action.item.amount,
               } : {...item}
         );
      } else {
         updatedItems = state.items.concat(action.item);
      }
      
      console.log("🚀 ~ file: CartProvider.js ~ line 26 ~ cartReducer ~ updatedItems", updatedItems)
      return {
         items: updatedItems,
         totalAmount: updatedTotalAmount,
      };
   }

   if(action.type === "REMOVE") {
      console.log(action.id)

      const existingItemIndex = state.items.findIndex(item => item.id === action.id)
      const existingItem = state.items[existingItemIndex];
      let updatedItems

      if (existingItem.amount === 1) {
         updatedItems = state.items.filter(item => item.id !== action.id)
      } else {
         const updatedItem = {...existingItem, amount: existingItem.amount - 1 }
         updatedItems = [...state.items]
         updatedItems[existingItemIndex] = updatedItem
      }

      const updatedTotalAmount = state.totalAmount - existingItem.price
      // console.log("🚀 ~ file: CartProvider.js ~ line 38 ~ cartReducer ~ updatedTotalAmount", updatedTotalAmount)
      // console.log("🚀 ~ file: CartProvider.js ~ line 36 ~ cartReducer ~ updatedItems", updatedItems)

      return{
         items: updatedItems,
         totalAmount: updatedTotalAmount,
      }
   }

   return defaultCartState;
};

const CartProvider = (props) => {
   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

   const addItemToCartHandler = (item) => {
      dispatchCartAction({ type: "ADD", item: item });
   };

   const removeItemFromCartHandler = (id) => {
      dispatchCartAction({ type: "REMOVE", id: id });
   };

   const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
   };

   return (
      <CartContext.Provider value={cartContext}>
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;
