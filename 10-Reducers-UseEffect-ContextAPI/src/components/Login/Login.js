import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from './../../store/auth-context'
import Input from './../UI/Input/Input'

const emailReducer = (state, action) => {
   if(action.type === 'USER_INPUT') {
      return {value: action.val, isValid: action.val.includes('@')}
   }
   if(action.type === 'PASSWORD_INPUT') {
      return {value: action.val, isValid: action.val.includes('@')}
   }
   if (action.type === 'INPUT_BLUR') {
      console.log(action)
      return {value: state.value, isValid: state.value.includes('@')}
   }
   // return { value: '', isValid: null}
}

const passwordReducer = (state, action) => {
   if(action.type === 'PASSWORD_INPUT') {
      return {value: action.val, isValid: action.val.trim().length > 6}
   }
   if (action.type === 'INPUT_BLUR') {
      console.log(action)
      return {value: state.value, isValid: state.value.trim().length > 6}
   }
}

const Login = (props) => {
   // const [enteredEmail, dispatchEmail]{type: 'USER_INPUT', val:  = useState(''});
   // const [emailIsValid, setEmailIsValid] = useState();
   // const [enteredPassword, setEnteredPassword] = useState('');
   // const [passwordIsValid, setPasswordIsValid] = useState();
   const [formIsValid, setFormIsValid] = useState(false);

   const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: '', 
      isValid: null
   });
   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
      value: '', 
      isValid: null
   });

   // useEffect(() => {
   //    console.log('use effect running')
   //    return () => {console.log('clean up')}
   // }, [])

   
   const { isValid: emailIsValid} = emailState;
   const { isValid: passwordIsValid} = passwordState;

   const authCtx = useContext(AuthContext)

   useEffect(() => {
      const identifier = setTimeout(() => {
         console.log('start validation')
         setFormIsValid(
            emailIsValid && passwordIsValid
         );
      }, 500)

      return () => {
         console.log('CLENUP ')
         clearTimeout(identifier);
      }

   }, [emailIsValid, passwordIsValid])


const emailChangeHandler = (event) => {
   dispatchEmail({type: 'USER_INPUT', val: event.target.value});

   setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
};

const passwordChangeHandler = (event) => {
   dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value})

   setFormIsValid(event.target.value.length > 6 && emailState.isValid)
};

const validateEmailHandler = () => {
   dispatchEmail({type: 'INPUT_BLUR'})

};

const validatePasswordHandler = () => {
   dispatchPassword({type: 'INPUT_BLUR'})
};

const emailInputRef = useRef()
const passwordInputRef = useRef()


const submitHandler = (event) => {
   event.preventDefault();
   if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
   } else if (!emailIsValid) {
      emailInputRef.current.focus()
   } else {
      passwordInputRef.current.focus()
   }
};

return (
   <Card className={classes.login}>
      <form onSubmit={submitHandler}>
         <Input
            isValid={emailState.isValid === false}
            label={'Email'}
            id={'email'}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            ref={emailInputRef}
         />
         <Input
            isValid={passwordState.isValid === false}
            label={'Password'}
            id={'password'}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            ref={passwordInputRef}
         />
         <div className={classes.actions}>
            <Button type="submit" className={classes.btn} >
               Login
            </Button>
         </div>
      </form>
   </Card>
);
};

export default Login;
