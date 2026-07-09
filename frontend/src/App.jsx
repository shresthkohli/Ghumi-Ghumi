import { useState } from 'react'
import Login from './pages/Login.jsx'
import{BrowserRouter , Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup.jsx";

function App() {
  const[darkMode , setdarkMode]= useState(false);
  return(<>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login darkMode={darkMode} setdarkMode={setdarkMode}/>}></Route>
    <Route path="/signup" element={<Signup darkMode={darkMode} setdarkMode={setdarkMode} />}></Route>
  </Routes>
  </BrowserRouter>
  </>);
}

export default App
