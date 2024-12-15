import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [signupFormData, setSignupFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });
    const [theme, setTheme] = useState(true);
    const [page, setPage] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSignupFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:2024`, signupFormData);
            console.log(response.data)

            setSignupFormData({
                username: "",
                email: "",
                password: "",
            });
        } catch (error) {
            console.log(error)
        }
    };

    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", loginFormData);
        setLoginFormData({
            email: "",
            password: "",
        })
    };

    return (
        <DataContext.Provider
            value={{
                passwordVisible,
                togglePasswordVisibility,
                handleChange,
                handleSubmit,
                signupFormData,
                loginFormData,
                handleLoginChange,
                handleLoginSubmit,
                theme,
                setTheme,
                page,
                setPage,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
