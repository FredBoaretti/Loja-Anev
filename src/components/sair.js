import React from "react";
import {Redirect} from "react-router-dom";

const Sair = () => {
  localStorage.removeItem('nome')
  localStorage.removeItem('token')

  return <Redirect to="/" />
}

export default Sair;