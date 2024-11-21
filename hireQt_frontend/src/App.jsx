
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import './App.css'
import Dashboard from './pages/Dashboard';
import ProfileSetup from "./pages/ProfileSetup";
import JobDescription from "./pages/JobDescription";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/profile" element= {<ProfileSetup/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element= {<Signin/>}/>
        <Route path="/dashboard" element= {<Dashboard/>}/>
        <Route path="/job/:id" element={<JobDescription/>}/>
        <Route path="/bookmark"element={<Bookmark/>}/>
      </Routes>
    </>
  )
}

export default App
