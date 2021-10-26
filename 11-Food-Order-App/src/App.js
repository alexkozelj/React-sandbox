import { useState } from 'react'
import Meals from './components/Meal/Meals'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {
   const [cartIsShown, setCartIsShown] = useState(false)

   const showCartHandler = () => {
      setCartIsShown(true)
   }
   
   const hideCartHandler = () => {
      setCartIsShown(false)
   }

   return (
      <CartProvider>
         {cartIsShown && <Cart onClose={hideCartHandler} />}
         <Header onShowCart={showCartHandler}/>
         <Meals />
      </CartProvider>
   );
}

export default App;
