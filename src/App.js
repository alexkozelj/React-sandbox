import { useState, Fragment } from 'react'
import classes from './App.module.css';
import Card from './components/UI/Card'
import AddUserForm from './components/Users/AddUserForm'
import UsersListLayout from './components/Users/UsersListLayout'


function App() {
   const [usersList, setUsersList] = useState([])

   const submitFormValuesHandler = (user) => {
      setUsersList((previousUserList) => {
         return [user, ...previousUserList]
      })
   }

   return (
      <Fragment>
         <AddUserForm onSubmitForm={submitFormValuesHandler} />
         {!usersList.length ? <Card className={classes.noUsersCard}><h2>No Users Found</h2></Card> : <UsersListLayout users={usersList} />}
      </Fragment>
   );
}

export default App;
