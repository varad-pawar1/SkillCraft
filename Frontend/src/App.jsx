import "./App.css";
import Dashboard from "./components/Dashboard";
import AuthenticationPage from "./components/AuthenticationPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<AuthenticationPage />} />
    </Routes>
  );
};

export default App;
