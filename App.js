import React from "react";
import Routes from "./src/services/routes";
import AuthProvider from './src/services/auth'

export default function App(){
  return(
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}