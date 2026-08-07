import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDestinationSearch from "../hooks/useDestinationSearch.js";
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL ?? "";

function Navbar() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const [searchOpen, setSearchOpen] = useState(false);
    const searchInputRef = useRef(null);

    const {
        searchQuery, setSearchQuery,
        searchError, setSearchError,
        isSearching,
        suggestions, showSuggestions, setShowSuggestions,
        handleSearch, pickSuggestion, dismissSuggestions, resetSearch,
    } = useDestinationSearch();

    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
    tl.fromTo(".logo", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 })
        .fromTo(".nav-links", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 })
        .to(".icon-btn", { opacity: 1, duration: 0.4, stagger: 0.06 })
        .to(".search-cta", { opacity: 1, duration: 0.5 });

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Close on Escape
    useEffect(() => {
        function handleKey(e) {
            if (e.key === "Escape") {
                setSearchOpen(false);
                resetSearch();
            }
        }
        if (searchOpen) {
            document.addEventListener("keydown", handleKey);
            return () => document.removeEventListener("keydown", handleKey);
        }
    }, [searchOpen, resetSearch]);

    function closeSearch() {
        setSearchOpen(false);
        resetSearch();
    }

    // Wrap pickSuggestion to also close the overlay
    function handlePickSuggestion(dest) {
        setSearchOpen(false);
        pickSuggestion(dest);
    }

    // Wrap handleSearch to close overlay on success
    async function handleNavSearch(e) {
        // We call handleSearch but also need to close overlay if it navigates
        // Since handleSearch resets query on success, we can detect that
        await handleSearch(e);
    }

    // Close overlay when searchQuery is reset (meaning a successful navigation happened)
    useEffect(() => {
        if (searchOpen && searchQuery === "" && !isSearching && !searchError) {
            setSearchOpen(false);
        }
    }, [searchQuery, isSearching, searchError]);

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
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="material-symbols-outlined text-white/80 hover:text-white transition-all duration-300"
                    >
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

            {/* ── Expandable Search Overlay ── */}
            <div
                className={`absolute inset-x-0 top-0 z-[60] transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${searchOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-full pointer-events-none"
                    }`}
            >
                <div className="bg-[#050d1a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
                    <div className="max-w-container-max mx-auto px-margin-desktop py-4 relative">
                        <form onSubmit={handleNavSearch} className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-white/50 text-2xl">search</span>

                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setSearchError(""); }}
                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                onBlur={dismissSuggestions}
                                placeholder="Search destinations..."
                                className="flex-1 bg-transparent font-body text-lg text-white placeholder-white/40 font-medium outline-none"
                            />

                            {isSearching && (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}

                            <button
                                type="submit"
                                disabled={isSearching || !searchQuery.trim()}
                                className="px-5 py-2 rounded-full bg-primary text-on-primary font-body text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                onClick={closeSearch}
                                className="material-symbols-outlined text-white/60 hover:text-white transition-colors text-2xl"
                            >
                                close
                            </button>
                        </form>

                        {/* Suggestions dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-4 right-4 mt-2 rounded-2xl bg-[#0a1a2e]/95 backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden animate-[fadeSlideDown_0.2s_ease-out] z-50">
                                {suggestions.map((dest) => (
                                    <button
                                        key={dest.id}
                                        type="button"
                                        onMouseDown={() => handlePickSuggestion(dest)}
                                        className="w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-white/10 transition-colors duration-150 group"
                                    >
                                        {dest.imageUrl && (
                                            <img
                                                src={`${API_URL}${dest.imageUrl}`}
                                                alt={dest.name}
                                                className="w-10 h-10 rounded-lg object-cover shrink-0 ring-1 ring-white/10"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-body text-sm font-semibold text-white truncate group-hover:text-primary-fixed transition-colors">
                                                {dest.name}
                                            </p>
                                            <p className="font-body text-xs text-white/50 truncate">
                                                {[dest.city, dest.state, dest.country].filter(Boolean).join(", ")}
                                            </p>
                                        </div>
                                        <span className="material-symbols-outlined text-white/30 group-hover:text-white/70 transition-colors text-[18px]">arrow_forward</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Inline error */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${searchError ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-400/25 backdrop-blur-md px-4 py-2 text-red-300 font-body text-sm">
                                <span className="material-symbols-outlined text-[16px]">error</span>
                                {searchError}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;