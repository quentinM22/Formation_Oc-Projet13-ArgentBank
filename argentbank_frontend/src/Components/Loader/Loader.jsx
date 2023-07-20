import React from 'react'
import './Loader.css'
import logo from "../../Assets/img/argentBankLogo.png"
const Loader = () => {
  return (
    <div className="loader">
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <img src={logo} alt="logo" />
    <div>Récupération des informations utilisateur</div>
    </div>
  )
}

export default Loader