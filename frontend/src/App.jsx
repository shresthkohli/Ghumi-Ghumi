import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';

// Pages
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup.jsx";
import Discover from "./pages/Discover.jsx";
import Itineraries from "./pages/Itineraries.jsx";
import Destinations from "./pages/Destinations.jsx";
import DestinationDetailPage from './pages/DestinationDetails.jsx';
import Guides from "./pages/Guides.jsx";
import Profile from './pages/Profile.jsx';

// Components
import Navbar from './components/Navbar.jsx'

function App() {
    const [darkMode, setdarkMode] = useState(false);
    return (<>
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Discover />} />
                    <Route path="/login" element={<Login darkMode={darkMode} setdarkMode={setdarkMode} />}></Route>
                    <Route path="/signup" element={<Signup darkMode={darkMode} setdarkMode={setdarkMode} />}></Route>
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/itineraries" element={<Itineraries />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/destinations/:id" element={<DestinationDetailPage />} />
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>);
}

export default App
