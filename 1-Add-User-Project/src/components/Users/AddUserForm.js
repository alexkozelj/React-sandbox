import React, { useState } from 'react'
import styles from './AddUserForm.module.css'
import Card from './../UI/Card'
import Button from './../UI/Button'
import ErrorModal from './../UI/ErrorModal'


const AddUserForm = (props) => {
   const [usernameTitle, setUsernameTitle] = useState('')
   const [ageTitle, setAgeTitle] = useState('')
   const [error, setError] = useState()

   const usernameTitleChangeHandler = (e) => {
      setUsernameTitle(e.target.value)
   }

   const ageTitleChangeHandler = (e) => {
      setAgeTitle(e.target.value)
   }

   const errorHandler = () => {
      setError(null)
   }

   const submitButtonHandler = (e) => {
      e.preventDefault()

      if (usernameTitle.trim().length === 0 || ageTitle.trim().length === 0) {
         return setError({
            header: 'Invalid Input',
            message: 'Please enter username and age'
         });
      }
      if (+ageTitle < 1) {
         return setError({
            header: 'Invalid Age',
            message: 'Age should be greater then 1'
         });
      }
      const userDetails = {
         username: usernameTitle,
         age: ageTitle,
         id: Math.random().toString()
      }
      props.onSubmitForm(userDetails)

      setUsernameTitle('')
      setAgeTitle('')
   }

   return (
      
      <Card className={styles.input}>
         {error && <ErrorModal onButtonClick={errorHandler} title={error.header} message={error.message}></ErrorModal>}
         <form onSubmit={submitButtonHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={usernameTitle} onChange={usernameTitleChangeHandler} />
            <label htmlFor="age">Age</label>
            <input id="age" type="number" value={ageTitle} onChange={ageTitleChangeHandler} />
            <Button type="submit">{'Add User'}</Button>
         </form>
      </Card>
   )
}

export default AddUserForm;