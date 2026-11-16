import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ResumeAnal from "./pages/ResumeAnal";
import AnalysisDetail from "./pages/AnalysisDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-analysis" element={<ResumeAnal />} />
        <Route path="/analysis/:id" element={<AnalysisDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
