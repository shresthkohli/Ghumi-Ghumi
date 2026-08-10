import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";

import travelLoading from "../assets/travel-loading.json";

function PageLoader({ onComplete }) {
    const loaderRef = useRef(null);
    const globeRef = useRef(null);
    const logoRef = useRef(null);

    /*
     * Initial appearance of globe + WANDERLY
     */
    useEffect(() => {
        const globe = globeRef.current;
        const logo = logoRef.current;

        if (!globe || !logo) return;

        gsap.set(globe, {
            opacity: 0,
            scale: 0.9,
        });

        gsap.set(logo, {
            opacity: 0,
            scale: 0.9,
        });

        const tl = gsap.timeline();

        // Globe appears
        tl.to(globe, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
        });

        // WANDERLY appears in the middle
        tl.to(
            logo,
            {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
            },
            "-=0.5"
        );

        return () => {
            tl.kill();
        };
    }, []);

    /*
     * Called automatically when the Lottie animation finishes
     */
    const handleLottieComplete = () => {
        const loader = loaderRef.current;
        const globe = globeRef.current;
        const logo = logoRef.current;

        /*
         * Find the REAL WANDERLY in the navbar
         */
        const navbarLogo = document.querySelector(
            "#navbar-logo"
        );

        /*
         * Safety fallback
         */
        if (!navbarLogo) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    onComplete?.();
                },
            });

            return;
        }

        /*
         * Position of loader WANDERLY
         */
        const logoRect = logo.getBoundingClientRect();

        /*
         * Position of navbar WANDERLY
         */
        const navbarRect = navbarLogo.getBoundingClientRect();

        /*
         * Center points
         */
        const logoCenterX =
            logoRect.left + logoRect.width / 2;

        const logoCenterY =
            logoRect.top + logoRect.height / 2;

        const navbarCenterX =
            navbarRect.left + navbarRect.width / 2;

        const navbarCenterY =
            navbarRect.top + navbarRect.height / 2;

        /*
         * Calculate exact movement
         */
        const moveX = navbarCenterX - logoCenterX;
        const moveY = navbarCenterY - logoCenterY;

        const tl = gsap.timeline({
            onComplete: () => {
                /*
                 * Loader is finished.
                 */
                onComplete?.();
            },
        });

        /*
         * WANDERLY moves to navbar
         */
        tl.to(logo, {
            x: moveX,
            y: moveY,
            scale: 0.65,
            duration: 1.15,
            ease: "power4.inOut",
        });

        /*
         * Globe fades away at the same time
         */
        tl.to(
            globe,
            {
                opacity: 0,
                scale: 1.05,
                duration: 0.9,
                ease: "power2.inOut",
            },
            "<"
        );

        /*
         * Remove loader
         */
        tl.to(loader, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",

            onComplete: () => {
                /*
                 * Show the actual navbar logo.
                 */
                gsap.set(navbarLogo, {
                    opacity: 1,
                });
            },
        });
    };

    return (
        <div
            ref={loaderRef}
            className="
                fixed
                inset-0
                z-[9999]
                flex
                items-center
                justify-center
                overflow-hidden
                bg-[#080908]
            "
        >

            {/* Very subtle glow behind globe */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[500px]
                    w-[500px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary/5
                    blur-[140px]
                "
            />

            {/* Globe */}
            <div
                ref={globeRef}
                className="
                    relative
                    flex
                    h-[320px]
                    w-[320px]
                    items-center
                    justify-center

                    sm:h-[400px]
                    sm:w-[400px]

                    md:h-[480px]
                    md:w-[480px]
                "
            >

                {/* Lottie globe */}
                <Lottie
                    animationData={travelLoading}
                    loop={false}
                    autoplay={true}
                    onComplete={handleLottieComplete}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                    "
                />

                {/* WANDERLY */}
                <div
                    ref={logoRef}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        z-20
                        -translate-x-1/2
                        -translate-y-1/2

                        whitespace-nowrap

                        font-display
                        text-2xl
                        font-medium
                        tracking-[0.22em]
                        text-white

                        sm:text-3xl
                        md:text-4xl
                    "
                >
                    WANDERLY
                </div>
            </div>
        </div>
    );
}

export default PageLoader;