
import './App.css';
import {
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/NoteState';
import Alert from './components/Alert';
import Signup from './components/signup';
import Login from './components/login';
import { useState } from 'react';

function App() {
  const [alert, setAlert]= useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    
     <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
    
  );
}

export default App;
