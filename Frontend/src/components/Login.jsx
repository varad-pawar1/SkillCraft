import React, { useContext } from "react";
import { DataContext } from "./Context";
import "../styles/Login.css";

const Login = () => {
  const {
    passwordVisible,
    togglePasswordVisibility,
    loginFormData,
    handleLoginChange,
    handleLoginSubmit,
    setPage
  } = useContext(DataContext);

  return (
    <div className="login_page">
      <h2>Sign In</h2>
      <form onSubmit={handleLoginSubmit}>
        <section>
          <label htmlFor="email">Your E-mail</label>
          <input
            type="text"
            id="email"
            placeholder="name@gmail.com"
            value={loginFormData.email}
            onChange={handleLoginChange}
          />
        </section>
        <section className="password_section">
          <label htmlFor="password">Your Password</label>
          <div className="password_input_wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={loginFormData.password}
              onChange={handleLoginChange}
            />
            <span
              className="password_toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <span>
                  <i className="fa-solid fa-eye"></i>
                </span>
              ) : (
                <span>
                  <i className="fa-solid fa-eye-slash"></i>
                </span>
              )}
            </span>
          </div>
        </section>
        <button type="submit" onClick={() => setPage(true)}>Sign in</button>
      </form>
      <p>Forgot your password ?</p>
    </div>
  );
};

export default Login;
