import React, { useRef, useImperativeHandle } from 'react'
import classes from './Input.module.css'

//Refactoring the Input component
//Input component is a reusable component
//This here will establish the connection
//forwardRef returns a React Input Component
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef()

  const activate = () => {
    inputRef.current.focus()
  }

  /* useImperativeHandle should be used with React.forwardRef. */
  /*useImperativeHandle hook sayesinde activate
  fonksiyonu parent component'e aktarıldı.*/
  useImperativeHandle(ref, () => {
    return {
      /*This is basically a translation object
      between internal functionalities and the outside world, 
      so the parent component */
      focus: activate,
    }
  })

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  )
})
export default Input

/* With the useImperativeHandle and forwardRef
we can expose functionalities from a React Component
to its parent component to then use our component
in the parent component through refs and trigger certain
functionalities  */
/* Especially in cases like this with focusing, 
but also in some other use cases like with scrolling and so on,
this can be very useful.
With the useImperativeHandle and forwardRef, we are able to make it work for functional components.*/
