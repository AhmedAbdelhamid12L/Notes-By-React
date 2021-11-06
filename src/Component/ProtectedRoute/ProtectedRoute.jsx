import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({path,component}) {
  if(localStorage.getItem('token'))
  {
    return (<Route path={path} component={component} />)
  }
  else 
  {
    return (<Redirect to='/signin'/>)
  }
}
