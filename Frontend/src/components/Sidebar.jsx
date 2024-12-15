import React, { useContext } from 'react'
import { DataContext } from './Context'
import "../styles/Sidebar.css";

const Sidebar = () => {
    const { theme, setTheme } = useContext(DataContext);

    return (
        <div className="sidebar" style={theme ? null : { backgroundColor: "#121212", color: "#FFFFFF" }}>
            <div className="sidebar_options">
                <h2>SkillCraft</h2>
                <div className="sidebar_top">
                    <div className="sidebar_option">
                        <div className="sidebar_icon"><i className="fa-solid fa-gauge"></i></div>
                        <div className="sidebar_title">Dashboard</div>
                    </div>
                    <div className="sidebar_option">
                        <div className="sidebar_icon"><i className="fa-solid fa-bullhorn"></i></div>
                        <div className="sidebar_title">Announcements</div>
                    </div>
                    <div className="sidebar_option">
                        <div className="sidebar_icon"><i className="fa-solid fa-chalkboard-teacher"></i></div>
                        <div className="sidebar_title">Lectures</div>
                    </div>
                    <div className="sidebar_option">
                        <div className="sidebar_icon"><i className="fa-solid fa-file-alt"></i></div>
                        <div className="sidebar_title">Assignments</div>
                    </div>
                    <div className="sidebar_option">
                        <div className="sidebar_icon"><i className="fa-solid fa-clipboard-list"></i></div>
                        <div className="sidebar_title">Quiz</div>
                    </div>
                </div>
            </div>
            <div className="sidebar_bottom">
                <div className="sidebar_option">
                    <div className="sidebar_icon"><i className="fa-solid fa-headset"></i></div>
                    <div className="sidebar_title">Support Ticket</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
