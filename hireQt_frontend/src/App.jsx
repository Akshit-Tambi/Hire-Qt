
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import './App.css'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element= {<Signin/>}/>
        <Route path="/dashboard" element= {<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
