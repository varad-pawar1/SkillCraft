import React, { useContext } from 'react'
import { DataContext } from './Context'
import "../styles/Routine.css";
import LectureBox from './LectureBox'

const Routine = () => {
  const { theme, setTheme } = useContext(DataContext);

  return (
    <div className="routine" style={theme ? null : { backgroundColor: "#121212", color: "#FFFFFF" }}>
      <h2>Today's Schedule</h2>
      <div className="lectures_container">
        <LectureBox />
        <LectureBox />
        <LectureBox />
        <LectureBox />
      </div>
    </div>
  )
}

export default Routine
