import React from 'react'
import ParticlesReact from '../ParticlesReact/ParticlesReact';
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import Notfound from '../Notfound/Notfound'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { Redirect, Route, Switch } from 'react-router-dom'

export default function App() {
  return (
    <>
      <Navbar/>
      <ParticlesReact/>
      <Switch>
        <Redirect exact from='/' to='/home' />
        <ProtectedRoute path='/home' component={Home} />
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='*' component={Notfound}/>
      </Switch>
    </>
  )
}
