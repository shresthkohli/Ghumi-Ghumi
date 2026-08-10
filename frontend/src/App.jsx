import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';

// Pages
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup.jsx";
import Discover from "./pages/Discover.jsx";
import Itineraries from "./pages/Itineraries.jsx";
import ItineraryDetail from './pages/ItineraryDetail.jsx';
import Destinations from "./pages/Destinations.jsx";
import DestinationDetailPage from './pages/DestinationDetails.jsx';
import Guides from "./pages/Guides.jsx";
import Blogs from './pages/Blogs.jsx';
import Profile from './pages/Profile.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Sustainability from './pages/Sustainability.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import Contact from './pages/Contact.jsx';

// Components
import Navbar from './components/common/Navbar.jsx'

function App() {
    const [darkMode, setdarkMode] = useState(false);
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Discover />} />
                        <Route path="/login" element={<Login darkMode={darkMode} setdarkMode={setdarkMode} />}></Route>
                        <Route path="/signup" element={<Signup darkMode={darkMode} setdarkMode={setdarkMode} />}></Route>
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/itineraries" element={<Itineraries />} />
                        <Route path="/itineraries/:id" element={<ItineraryDetail />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/sustainability" element={<Sustainability />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App
