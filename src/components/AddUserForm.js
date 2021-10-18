import React, {useState} from 'react'
import styles from './AddUserForm.module.css'


const AddUserForm = (props) => {
   const [usernameTitle, setUsernameTitle] = useState('')
   const [ageTitle, setAgeTitle] = useState(0)
   
   const usernameTitleChangeHandler = (e) => {
      setUsernameTitle(e.target.value)
   }

   const ageTitleChangeHandler = (e) => {
      setAgeTitle(e.target.value)
   }

   const submitButtonHandler = (e) => {
      e.preventDefault()

      const userDetails = {
         username: usernameTitle,
         age: ageTitle,
         id: Math.random().toString()
      }

      props.onSubmitForm(userDetails)
   }

   return (
      <form>
         <div className={styles.newUser__controls}>
            <div className={styles.newUser__control}>
               <label>Username</label>
               <input type="text" value={usernameTitle} onChange={usernameTitleChangeHandler}  />
            </div>
            <div className={styles.newUser__control}>
               <label>Age (Years)</label>
               <input type="number" value={ageTitle} onChange={ageTitleChangeHandler} />
            </div>
         </div>
         <div className={styles.newUser__actions}>
            <button type='button' className={styles.button} onChange={submitButtonHandler} >Add User</button>
         </div>
      </form>
   )
}

export default AddUserForm;