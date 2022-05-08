import React, { useState, useEffect } from 'react'

// It is an object that will contain a component
/* We don't need this object here instead
we will need in the other components. */
const AuthContext = React.createContext({
  isLoggedIn: false,
  //onLogout is not going to use
  onLogout: () => {},
  /*That data is not needed but technically 
  we would it in a real app.*/
  onLogin: (email, password) => {},
})

//AuthContextProvider component
export const AuthContextProvider = (props) => {
  //Log State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginHandler = () => {
    localStorage.setItem('IsLoggedIn', '1')
    setIsLoggedIn(true)
  }
  const logoutHandler = () => {
    localStorage.removeItem('IsLoggedIn')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    console.log('Effect Running')
    return () => {
      console.log('Effect cleanup')
    }
  }, [])

  useEffect(() => {
    const storedLoggedInInfo = localStorage.getItem('IsLoggedIn')
    if (storedLoggedInInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  /*AuthContext is not a component, but in JSX we need 
  component. So with a dot we can access the provider property that
  contains a component. */
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
