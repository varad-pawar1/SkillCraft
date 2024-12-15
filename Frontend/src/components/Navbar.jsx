import React, { useContext } from 'react'
import { DataContext } from './Context'
import "../styles/Navbar.css"

const Navbar = () => {
    const { theme, setTheme } = useContext(DataContext);

    return (
        <div className="navbar" style={theme ? null : { backgroundColor: "#121212", color: "#FFFFFF" }}>
            <div className="searchbar" style={theme ? null : { backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" placeholder="Search" style={theme ? null : { backgroundColor: "#1E1E1E", color: "#FFFFFF" }} />
            </div>
            <div className="nav_options">
                <span className="theme" onClick={() => setTheme(!theme)}>
                    <span>{theme ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i> }</span>
                </span>
                <span className="user_profile">
                    <i class="fa-solid fa-user"></i>
                </span>
            </div>
        </div>
    )
}

export default Navbar
