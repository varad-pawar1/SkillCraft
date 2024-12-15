import React from 'react'
import "../styles/AuthenticationPage.css";
import Login from './Login'
import Signup from './Signup'

const AuthenticationPage = () => {
  return (
    <div className="authentication_page">
      <h2>SkillCraft</h2>
      <Login />
      {/* <Signup /> */}
      <p>&copy; 2024 by SkillCraft</p>
    </div>
  )
}

export default AuthenticationPage
