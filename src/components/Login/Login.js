import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'
import Input from '../UI/Input/Input'

//reducer function should return the new updated state
//reducer function receives the latest state
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  //default= the field is red
  return { value: '', isValid: false }
}
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  //default= the field is red
  return { value: '', isValid: false }
}

const Login = () => {
  /* const [enteredEmail, setEnteredEmail] = useState('')
     const [emailIsValid, setEmailIsValid] = useState()  */

  /* const [enteredPassword, setEnteredPassword] = useState('')
     const [passwordIsValid, setPasswordIsValid] = useState() */

  const [formIsValid, setFormIsValid] = useState(false)

  //Reducer hook structure yönünden state hook'a benzer, ancak onun genişletilmiş halidir.
  //Reducer hook sayesinde email ve password için yapılan durum kontrolleri tek bir yerden yönetilmiştir.

  //Reducer Hook for email
  const [emailState, dispactEmail] = useReducer(emailReducer, {
    //initial State
    value: '',
    isValid: null,
  })
  //Reducer Hook for password
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    //initial State
    {
      value: '',
      isValid: null,
    }
  )
  const ctx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  /* Related state'lerde effect hook kullanılması gerekir.(değişikliklerin kontrolü için garanti yol) 
     Çünkü bir state'de değişiklik yapılacağı zaman diğer state'in değeri güncellenmemiş olabilir.
     Effect hook, depedency'lerde bir değişiklik olmadığı sürece içerisindeki kodları çalıştırmaz. */
  useEffect(() => {
    //setTimeout metodu, işlemler için gecikme veya delay imkanı sağlar.
    const identifier = setTimeout(() => {
      console.log('Checking from validity!')
      setFormIsValid(emailState.isValid && passwordState.isValid)
    }, 500)

    return () => {
      console.log('Cleanup')
      /*clearTimout metodu setTimeout metodu ile zamanlanmış bir işlemin 
      iptal edilmesi için kullanılan bir metottur.*/
      clearTimeout(identifier)
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    //dispatch user input action
    dispactEmail({ type: 'USER_INPUT', value: event.target.value })

    //setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
  }

  const passwordChangeHandler = (event) => {
    //dispatch user password action
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value })

    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
  }

  const validateEmailHandler = () => {
    //dispatch validating of user input action
    dispactEmail({ type: 'INPUT_BLUR' })

    //setFormIsValid(emailState.isValid && passwordState.isValid)
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })

    //setFormIsValid(emailState.isValid && passwordState.isValid)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value)
    } else if (!emailState.isValid) {
      //emailState.isValid is invalid
      emailInputRef.current.focus()
      //password.isValid is invalid
    } else {
      passwordInputRef.current.focus()
    }
  }

  /*Email and password component are used as two 
  separate components*/
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
