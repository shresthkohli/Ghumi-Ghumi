import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDestinationSearch from "../../hooks/useDestinationSearch.js";
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL ?? "";

function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, loading } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [navVisible, setNavVisible] = useState(true);
    const lastScrollY = useRef(0);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show near the top
            if (currentScrollY < 60) {
                setNavVisible(true);
            } else if (currentScrollY > lastScrollY.current + 8) {
                // Scrolling down -> hide navbar
                if (!menuOpen && !searchOpen) {
                    setNavVisible(false);
                }
            } else if (currentScrollY < lastScrollY.current - 8) {
                // Scrolling up -> show navbar
                setNavVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpen, searchOpen]);

    const {
        searchQuery, setSearchQuery,
        searchError, setSearchError,
        isSearching,
        suggestions, showSuggestions, setShowSuggestions,
        handleSearch, pickSuggestion, dismissSuggestions, resetSearch,
    } = useDestinationSearch();

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
        tl.fromTo(".logo", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 })
            .fromTo(".nav-links", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 })
            .to(".icon-btn", { opacity: 1, duration: 0.4, stagger: 0.06 });
    }, []);

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
                setMenuOpen(false);
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
        if (e && e.preventDefault) e.preventDefault();
        const success = await handleSearch(e);
        if (success) {
            setSearchOpen(false);
        }
    }

    function handleMobileLinkClick() {
        setMenuOpen(false);
    }

    function openMobileSearch() {
        setMenuOpen(false);
        setSearchOpen(true);
    }

    return (
        <header className={`bg-surface-container-high/85 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/20 shadow-sm transition-transform duration-300 ease-in-out ${navVisible || menuOpen || searchOpen ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="logo flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop py-3.5 sm:py-4 w-full max-w-container-max mx-auto">
                <Link id="navbar-logo" to="/" className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight hover:opacity-90 transition-opacity shrink-0">
                    Wanderly
                </Link>

                <div className="hidden md:flex items-center gap-6 lg:gap-8 font-body text-sm lg:text-body-md">
                    <Link className="nav-links group relative font-body text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1" to="/discover">
                        Discover
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                    <Link className="nav-links group relative font-body text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1" to="/itineraries">
                        Itineraries
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                    <Link className="nav-links group relative font-body text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1" to="/destinations">
                        Destinations
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                    <Link className="nav-links group relative font-body text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1" to="/blogs">
                        Blogs
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                </div>

                <div className="icon-btn flex items-center gap-3 sm:gap-6">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all duration-300 p-1 cursor-pointer"
                        aria-label="Open search"
                    >
                        search
                    </button>

                    {loading ? (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-outline-variant/30 animate-pulse" />
                    ) : user ? (
                        <Link
                            to="/profile"
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary/40 overflow-hidden ring-2 ring-primary/20"
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
                            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-primary text-on-primary font-body text-xs sm:text-label-lg uppercase hover:bg-primary-container transition-colors shadow-md font-semibold"
                        >
                            Log in
                        </Link>
                    )}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex items-center justify-center w-9 h-9 text-on-surface-variant hover:text-primary cursor-pointer ml-1"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-2xl sm:text-3xl">
                            {menuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ?
                    "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}>
                <div className="border-t border-outline-variant/20 bg-surface-container-high/95 backdrop-blur-xl px-5 sm:px-8 py-5">
                    <div className="flex flex-col">
                        <Link to="/discover"
                            onClick={handleMobileLinkClick}
                            className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary border-b border-outline-variant/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[22px] text-primary">
                                explore
                            </span>
                            <span className="font-body text-base font-medium">
                                Discover
                            </span>
                        </Link>
                        <Link to="/itineraries"
                            onClick={handleMobileLinkClick}
                            className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary border-b border-outline-variant/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[22px] text-primary">
                                map
                            </span>
                            <span className="font-body text-base font-medium">
                                Itineraries
                            </span>
                        </Link>
                        <Link to="/destinations"
                            onClick={handleMobileLinkClick}
                            className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary border-b border-outline-variant/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[22px] text-primary">
                                location_on
                            </span>
                            <span className="font-body text-base font-medium">
                                Destinations
                            </span>
                        </Link>
                        <Link to="/blogs"
                            onClick={handleMobileLinkClick}
                            className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary border-b border-outline-variant/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[22px] text-primary">
                                menu_book
                            </span>
                            <span className="font-body text-base font-medium">
                                Blogs
                            </span>
                        </Link>
                        <button
                            onClick={openMobileSearch}
                            className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary border-b border-outline-variant/20 transition-colors text-left"
                        >
                            <span className="material-symbols-outlined text-[22px] text-primary">
                                search
                            </span>
                            <span className="font-body text-base font-medium">
                                Search
                            </span>
                        </button>
                        {loading ? (
                            <div className="flex items-center gap-4 py-4">
                                <div className="w-9 h-9 rounded-full bg-outline-variant/30 animate-pulse" />
                                <div className="h-4 w-20 rounded bg-outline-variant/30 animate-pulse" />
                            </div>
                        ) : user ? (
                            <Link
                                to="/profile"
                                onClick={handleMobileLinkClick}
                                className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary transition-colors" >
                                <div className="w-9 h-9 rounded-full border border-primary/30 overflow-hidden">
                                    <img
                                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                                        alt={user.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-body text-base font-medium">
                                    Profile
                                </span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                onClick={handleMobileLinkClick}
                                className="flex items-center gap-4 py-4 text-on-surface-variant hover:text-primary transition-colors" >
                                <span className="material-symbols-outlined text-[22px] text-primary">
                                    login
                                </span>
                                <span className="font-body text-base font-medium">
                                    Log in
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Expandable Search Overlay ── */}
            <div
                className={`absolute inset-x-0 top-0 z-[60] transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${searchOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-full pointer-events-none"
                    }`}
            >
                <div className="bg-surface-container-high/95 backdrop-blur-xl border-b border-outline-variant/20 shadow-2xl">
                    <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop py-4 relative">
                        <form
                            onSubmit={handleNavSearch}
                            className="flex items-center gap-3 sm:gap-4">
                            <span className="material-symbols-outlined text-on-surface-variant/70 text-xl sm:text-2xl shrink-0">
                                search
                            </span>

                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSearchError("");
                                }}
                                onFocus={() =>
                                    suggestions.length > 0 &&
                                    setShowSuggestions(true)}
                                onBlur={dismissSuggestions}
                                placeholder="Search destinations..."
                                className="flex-1 bg-transparent font-body text-base sm:text-lg text-on-surface placeholder-on-surface-variant/50 font-medium outline-none min-w-0"
                            />

                            {isSearching && (
                                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            )}

                            <button
                                type="submit"
                                disabled={isSearching || !searchQuery.trim()}
                                className="hidden sm:block px-5 py-2 rounded-full bg-primary text-on-primary font-body text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                onClick={closeSearch}
                                className="material-symbols-outlined text-on-surface-variant/70 hover:text-primary transition-colors text-2xl cursor-pointer"
                            >
                                close
                            </button>
                        </form>

                        {/* Suggestions dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-4 right-4 mt-2 rounded-2xl bg-surface-container-highest/95 backdrop-blur-xl border border-outline-variant/30 shadow-2xl overflow-hidden animate-[fadeSlideDown_0.2s_ease-out] z-50">
                                {suggestions.map((dest) => (
                                    <button
                                        key={dest.id}
                                        type="button"
                                        onMouseDown={() => handlePickSuggestion(dest)}
                                        className="w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-surface-container transition-colors duration-150 group"
                                    >
                                        {dest.imageUrl && (
                                            <img
                                                src={`${API_URL}${dest.imageUrl}`}
                                                alt={dest.name}
                                                className="w-10 h-10 rounded-lg object-cover shrink-0 ring-1 ring-outline-variant/20"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-body text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                                                {dest.name}
                                            </p>
                                            <p className="font-body text-xs text-on-surface-variant/70 truncate">
                                                {[dest.city, dest.state, dest.country].filter(Boolean).join(", ")}
                                            </p>
                                        </div>
                                        <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors text-[18px]">arrow_forward</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Inline error */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${searchError ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-400/25 backdrop-blur-md px-4 py-2 text-red-600 font-body text-sm">
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