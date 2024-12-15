import "./App.css"
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Routine from './components/Routine'
import AuthenticationPage from './components/AuthenticationPage'

const App = () => {

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Navbar />
          <Routine />
        </div>
      </div>
      {/* <AuthenticationPage /> */}
    </>
  )
}

export default App
