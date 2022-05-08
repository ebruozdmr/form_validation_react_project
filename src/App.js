import React, { useContext } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'

//AuthContext object
import AuthContext from './store/auth-context'

function App() {
  //useContext Hook(kanca)
  //AuthContext object points the context values
  const ctx = useContext(AuthContext)

  //React Fragment is used to avoid the "div soup" case
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  )
}

export default App
