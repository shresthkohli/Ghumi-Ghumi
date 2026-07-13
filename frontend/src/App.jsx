import { useState } from 'react'
import{BrowserRouter , Routes , Route} from "react-router-dom";

// Pages
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup.jsx";
import Discover from "./pages/Discover.jsx";
import Itineraries from "./pages/Itineraries.jsx";
import Destinations from "./pages/Destinations.jsx";
import Guides from "./pages/Guides.jsx";
import Profile from './pages/Profile.jsx';

// Components
import Navbar from './components/Navbar.jsx'

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
    <Route path="/profile" element={<Profile />} />
  </Routes>
  </BrowserRouter>
  </>);
}

export default App
