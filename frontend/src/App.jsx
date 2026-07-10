import { useState } from 'react'
import Login from './pages/Login.jsx'
import{BrowserRouter , Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Navbar from './components/Navbar.jsx'
import Discover from "./pages/Discover";
import Itineraries from "./pages/Itineraries";
import Destinations from "./pages/Destinations";
import Guides from "./pages/Guides";

function App() {
  const[darkMode , setdarkMode]= useState(false);
  return(<>
  <BrowserRouter>
   <Navbar/>
  <Routes>
    <Route path="/" element={<Login darkMode={darkMode} setdarkMode={setdarkMode}/>}></Route>
    <Route path="/signup" element={<Signup darkMode={darkMode} setdarkMode={setdarkMode} />}></Route>
    <Route path="/discover" element={<Discover />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/guides" element={<Guides />} />
  </Routes>
  </BrowserRouter>
  </>);
}

export default App
