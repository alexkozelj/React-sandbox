import { Fragment } from 'react'
import Meals from './components/Meal/Meals'
import Header from './components/Layout/Header'

function App() {
   return (
      <Fragment>
         <Header />
         <Meals />
      </Fragment>
   );
}

export default App;
