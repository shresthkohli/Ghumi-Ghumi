import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import FeaturedJourney from "../components/FeaturedJourneys";
import ItinerariesSection from "../components/ItinerariesSection.jsx";
import Footer from "../components/Footer.jsx";
import destinationsApi from "../api/destinationApi.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Globe from "../components/Globe.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Discover() {
    const wrapRef = useRef(null);
    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const eyebrowRef = useRef(null);
    const searchBarRef = useRef(null);
    const globeContainerRef = useRef(null);
    const globeObjectsRef = useRef(null);

    /** Called by <Globe /> once the Three.js scene is ready */
    const handleGlobeReady = useCallback(({ scene, camera, renderer, globeGroup }) => {
        globeObjectsRef.current = { scene, camera, renderer, globeGroup };
    }, []);

    useEffect(() => {
        let split;

        const ctx = gsap.context(() => {
            const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Fade in eyebrow
            introTl.from(eyebrowRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.6,
            });

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
                    "-=0.1"
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
                "-=0.6"
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
            <div ref={heroRef} className="relative inset-0 overflow-hidden md:h-screen h-[520px]"
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
                            width: "min(95vh, 95vw)",
                            height: "min(95vh, 95vw)",
                        }}
                    >
                        <Globe onReady={handleGlobeReady} />
                    </div>
                </div>

                {/* ── Text & search overlay ── */}
                <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
                    <h1 ref={eyebrowRef} className="eyebrow text-white/80 mb-6 text-xl font-body font-bold tracking-widest">
                        THE WORLD AWAITS
                    </h1>

                    <h1 ref={headlineRef} className="headline text-5xl font-bold font-display leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                        Curated Expeditions for <br></br>
                        the Discerning Explorer
                    </h1>

                    {/* ── Search pill + Orange Explore CTA ── */}
                    <div
                        className="pointer-events-auto relative z-20 mt-8 flex w-full max-w-xl items-center justify-between gap-3 rounded-full bg-white/15 p-2 sm:p-2.5 backdrop-blur-md border border-white/20 shadow-2xl"
                        ref={searchBarRef}
                    >
                        <div className="flex flex-1 items-center gap-3 px-4">
                            <MapPin className="text-white/70 w-5 h-5 shrink-0" />
                            <span className="font-body text-base sm:text-lg text-white/80 font-medium">
                                Where to next?
                            </span>
                        </div>

                        <Link
                            to="/destinations"
                            className="glossy-button shrink-0 px-6 py-3 rounded-full text-white font-body text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <FeaturedJourney />
        <ItinerariesSection />
        <Footer />
    </>);
}
export default Discover;