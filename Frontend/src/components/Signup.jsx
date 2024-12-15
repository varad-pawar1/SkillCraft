import React, { useContext } from "react";
import { DataContext } from "./Context";
import "../styles/Signup.css";

const Signup = () => {
    const {
        passwordVisible,
        togglePasswordVisibility,
        handleChange,
        handleSubmit,
        signupFormData,
    } = useContext(DataContext);

    return (
        <div className="signup_page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor="signupUsername">Your Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="John Doe"
                        value={signupFormData.username}
                        onChange={handleChange}
                    />
                </section>
                <section>
                    <label htmlFor="signupEmail">Your E-mail</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="name@gmail.com"
                        value={signupFormData.email}
                        onChange={handleChange}
                    />
                </section>
                <section className="password_section">
                    <label htmlFor="signupPassword">Your Password</label>
                    <div className="password_input_wrapper">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={signupFormData.password}
                            onChange={handleChange}
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
                <button type="submit">Signup</button>
            </form>
            <p>Forgot your password ?</p>
            <p>Already have an account ? Login</p>
        </div>
    );
};

export default Signup;
