import React, { useContext } from 'react'
import { DataContext } from './Context'
import "../styles/LectureBox.css"

const LectureBox = () => {
    const { theme, setTheme } = useContext(DataContext);

    return (
        <div className="lecture_box" style={theme ? null : { backgroundColor: "#121212", color: "#FFFFFF" }}>
            <div className="lecture_icon"><i className="fa-solid fa-book-open" style={{ color: "#74C0FC" }}></i></div>
            <div className="lecture_details">
                <div className="first_row">
                    <div className="lecture_title">Code Talk Session</div>
                    <div className="lecture_tag">LIVE SESSION</div>
                </div>
                <div className="second_row">
                    <div className="instructor_details">
                        <span className="instructor_img"><i className="fa-solid fa-user"></i></span>
                        <span className="instructor_name">Aravind Sudheer</span>
                    </div>
                    <div className="date_time_details">
                        <span className="datetime_icon"><i className="fa-regular fa-calendar"></i></span>
                        <span className="date_time">14 Dec, 2024, 11:30 AM</span>
                    </div>
                    <div className="lecture_type">
                        <span className="type_icon"><i className="fa-solid fa-tag"></i></span>
                        <span className="lecture_category">General</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LectureBox
