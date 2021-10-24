import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {

const inputRef = useRef()

const activate = () => {
   inputRef.current.focus()
}

useImperativeHandle(ref, (e) => {
   return {
      focus: activate
   }
})

   return (
      <div
         className={`${classes.control} ${props.isValid ? classes.invalid : ''
            }`}
      >
         <label htmlFor={props.type}>{props.label}</label>
         <input
            type={props.type || 'input'}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            ref={inputRef}
         />
      </div>
   )
})

export default Input