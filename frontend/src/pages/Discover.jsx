import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Search, Loader2 } from "lucide-react";
import FeaturedJourney from "../components/discover/FeaturedJourneys.jsx";
import ItinerariesSection from "../components/discover/ItinerariesSection.jsx";
import Footer from "../components/common/Footer.jsx";
import destinationsApi from "../api/destinationApi.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Globe from "../components/discover/Globe.jsx";
import useDestinationSearch from "../hooks/useDestinationSearch.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const API_URL = import.meta.env.VITE_API_URL ?? "";

function Discover() {
    const navigate = useNavigate();
    const wrapRef = useRef(null);
    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const eyebrowRef = useRef(null);
    const searchBarRef = useRef(null);
    const globeContainerRef = useRef(null);
    const globeObjectsRef = useRef(null);

    const {
        searchQuery, setSearchQuery,
        searchError, setSearchError,
        isSearching,
        suggestions, showSuggestions, setShowSuggestions,
        handleSearch, pickSuggestion, dismissSuggestions,
    } = useDestinationSearch();

    /** Called by <Globe /> once the Three.js scene is ready */
    const handleGlobeReady = useCallback(({ scene, camera, renderer, globeGroup }) => {
        globeObjectsRef.current = { scene, camera, renderer, globeGroup };
    }, []);

    useEffect(() => {
        let split;

        const ctx = gsap.context(() => {
            const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 0. Globe appear animation
            if (globeContainerRef.current) {
                introTl.fromTo(
                    globeContainerRef.current,
                    {
                        opacity: 0,
                        scale: 0.7,
                        y: 35,
                        filter: "blur(12px)",
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1.8,
                        ease: "power3.out",
                    },
                    0
                );
            }

            // 1. Fade in eyebrow
            introTl.from(
                eyebrowRef.current,
                {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                },
                0.25
            );

            // 2. SplitText character entrance
            if (headlineRef.current) {
                split = new SplitText(headlineRef.current, { type: "words, chars" });

                introTl.from(
                    split.chars,
                    {
                        opacity: 0,
                        y: 40,
                        rotateX: -80,
                        stagger: 0.02,
                        duration: 1.1,
                        ease: "back.out(1.4)",
                    },
                    0.45
                );
            }

            // 3. Search bar entrance
            introTl.from(
                searchBarRef.current,
                {
                    opacity: 0,
                    y: 25,
                    scale: 0.95,
                    duration: 0.6,
                    ease: "back.out(1.4)",
                },
                0.95
            );

            // 4. Cinematic Scroll-Driven Exit Timeline
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapRef.current,
                    start: "top top",
                    end: "+=45%",
                    pin: heroRef.current,
                    scrub: 1,
                },
            });

            // 3D Character Scatter & Blur Fly-Through on Scroll
            if (split && split.chars) {
                scrollTl.to(
                    split.chars,
                    {
                        opacity: 0,
                        y: -100,
                        scale: 1.3,
                        rotateX: 45,
                        filter: "blur(12px)",
                        stagger: {
                            amount: 0.35,
                            from: "center",
                        },
                        ease: "power2.inOut",
                    },
                    0
                );
            } else {
                scrollTl.to(headlineRef.current, { opacity: 0, y: -100, filter: "blur(10px)", ease: "none" }, 0);
            }

            scrollTl
                .to(eyebrowRef.current, { opacity: 0, y: -50, filter: "blur(6px)", ease: "none" }, 0)
                .to(searchBarRef.current, { opacity: 0, y: 70, scale: 0.85, filter: "blur(8px)", ease: "none" }, 0);

            /* ── Globe scroll animation: zoom up into camera ── */
            if (globeContainerRef.current) {
                scrollTl.to(
                    globeContainerRef.current,
                    {
                        scale: 2.3,
                        y: -50,
                        opacity: 0,
                        ease: "none",
                    },
                    0
                );
            }
        }, wrapRef);

        return () => {
            ctx.revert();
            if (split) split.revert();
        };
    }, []);

    /* Scroll‑driven globe rotation via GSAP */
    useEffect(() => {
        const st = ScrollTrigger.create({
            trigger: wrapRef.current,
            start: "top top",
            end: "+=45%",
            scrub: 1,
            onUpdate: (self) => {
                if (!globeObjectsRef.current) return;
                const { globeGroup } = globeObjectsRef.current;
                globeGroup.rotation.y += self.getVelocity() * 0.00003;
            },
        });
        return () => st.kill();
    }, []);

    const [ladakh, setLadakh] = useState([]);

    useEffect(() => {
        async function getImage() {
            const data = await destinationsApi.getDestinationsByQuery("name=Ladakh");
            setLadakh(data[0]);
            ScrollTrigger.refresh();
        }
        getImage();
    }, []);

    return (<>
        <section ref={wrapRef}>
            <div ref={heroRef} className="relative inset-0 overflow-hidden min-h-[580px] h-[100svh] md:h-screen"
                style={{ background: "radial-gradient(ellipse at center 40%, #0a182b 0%, #050e1c 55%, #020710 100%)", perspective: "1000px" }}
            >
                {/* ── Subtle celestial coordinate grid & star textures to break monotonicity ── */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none opacity-40" />

                {/* ── Concentric orbital rings ── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                    <div className="w-[min(115vh,115vw)] h-[min(115vh,115vw)] rounded-full border border-dashed border-white/30 animate-[spin_180s_linear_infinite]" />
                    <div className="absolute w-[min(85vh,85vw)] h-[min(85vh,85vw)] rounded-full border border-white/10" />
                </div>

                {/* ── Soft celestial light accents ── */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#163f3f]/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#1a385c]/20 rounded-full blur-[120px] pointer-events-none" />

                {/* ── 3D Globe – almost full-page ── */}
                <div
                    ref={globeContainerRef}
                    className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
                >
                    <div
                        className="relative pointer-events-auto"
                        style={{
                            width: "min(85vh, 90vw)",
                            height: "min(85vh, 90vw)",
                        }}
                    >
                        <Globe onReady={handleGlobeReady} />
                    </div>
                </div>

                {/* ── Text & search overlay ── */}
                <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none">
                    <p ref={eyebrowRef} className="eyebrow text-white/80 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base lg:text-lg font-body font-bold tracking-[0.2em] sm:tracking-widest uppercase">
                        THE WORLD AWAITS
                    </p>

                    <h1 ref={headlineRef} className="headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.15] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] max-w-4xl">
                        Curated Expeditions for <br className="hidden sm:inline"></br>
                        the Discerning Explorer
                    </h1>

                    {/* ── Search pill + Search CTA ── */}
                    <form
                        onSubmit={handleSearch}
                        className="pointer-events-auto relative z-20 mt-6 sm:mt-8 w-full max-w-xl px-1 sm:px-0"
                        ref={searchBarRef}
                    >
                        <div className="flex items-center justify-between gap-2 sm:gap-3 rounded-full bg-white/15 p-1.5 sm:p-2.5 backdrop-blur-md border border-white/20 shadow-2xl">
                            <div className="flex flex-1 items-center gap-2 sm:gap-3 px-2 sm:px-4 min-w-0">
                                <MapPin className="text-white/70 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setSearchError(""); }}
                                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                    onBlur={dismissSuggestions}
                                    placeholder="Where to next?"
                                    className="w-full bg-transparent font-body text-sm sm:text-base md:text-lg text-white placeholder-white/50 font-medium outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSearching}
                                className="glossy-button shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white font-body text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 sm:gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
                            >
                                {isSearching ? (
                                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                                ) : (
                                    <>
                                        <span>Explore</span>
                                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Suggestions dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#0a1a2e]/90 backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
                                {suggestions.map((dest) => (
                                    <button
                                        key={dest.id}
                                        type="button"
                                        onMouseDown={() => pickSuggestion(dest)}
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
                                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors shrink-0" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Inline error */}
                        <div
                            className={`mt-3 text-center transition-all duration-300 ${searchError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-md px-4 py-2 text-red-300 font-body text-sm">
                                <span className="material-symbols-outlined text-[16px]">error</span>
                                {searchError}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <FeaturedJourney />
        <ItinerariesSection />
        <Footer />
    </>);
}
export default Discover;