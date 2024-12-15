import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Routine from './Routine'

const Dashboard = () => {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <Navbar />
                <Routine />
            </div>
        </div>
    )
}

export default Dashboard
