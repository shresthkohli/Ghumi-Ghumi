import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Navbar() {

    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
    tl.fromTo(".logo", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 })
        .fromTo(".nav-links", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 })
        .to(".icon-btn", { opacity: 1, duration: 0.4, stagger: 0.06 })
        .to(".search-cta", { opacity: 1, duration: 0.5 });

    const { user, loading } = useAuth();

    return (
        <header className="bg-[#050d1a]/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-lg">
            <nav className="logo flex justify-between items-center px-margin-desktop py-4 w-full max-w-container-max mx-auto">
                <Link to="/" className="font-display text-4xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
                    Wanderly
                </Link>

                <div className="hidden md:flex items-center gap-gutter font-body text-body-md">
                    <Link className="nav-links text-white/80 font-medium hover:text-white transition-colors" to="/discover">
                        Discover
                    </Link>
                    <Link className="nav-links text-white/80 font-medium hover:text-white transition-colors" to="/itineraries">
                        Itineraries
                    </Link>
                    <Link className="nav-links text-white/80 font-medium hover:text-white transition-colors" to="/destinations">
                        Destinations
                    </Link>
                    <Link className="nav-links text-white/80 font-medium hover:text-white transition-colors" to="/guides">
                        Guides
                    </Link>
                </div>

                <div className="icon-btn flex items-center gap-6">
                    <button className="material-symbols-outlined text-white/80 hover:text-white transition-all duration-300">
                        search
                    </button>

                    {loading ? (
                        <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
                    ) : user ? (
                        <Link
                            to="/profile"
                            className="w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden ring-2 ring-white/20"
                        >
                            <img
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-full bg-primary text-on-primary font-body text-label-lg uppercase hover:bg-primary-container transition-colors shadow-md"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;