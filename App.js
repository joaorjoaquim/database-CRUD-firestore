import React from "react";
import Routes from "./src/services/routes";
import RootProvider from './src/services/RootProvider'

export default function App(){
  return(
    <RootProvider>
      <Routes/>
    </RootProvider>
  )
}
