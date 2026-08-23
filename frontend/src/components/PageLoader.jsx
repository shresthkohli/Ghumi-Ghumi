import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import travelLoading from "../assets/travel-loading.json";

gsap.registerPlugin(SplitText);

function PageLoader({ onComplete }) {
    const loaderRef = useRef(null);
    const globeRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const globe = globeRef.current;
        const logo = logoRef.current;

        if (!globe || !logo) return;

        // Split WANDERLY into individual letters
        const split = new SplitText(logo, {
            type: "chars",
        });

        // Initial states
        gsap.set(globe, {
            opacity: 0,
            scale: 0.88,
        });

        gsap.set(split.chars, {
            opacity: 0,
            y: 12,
            filter: "blur(6px)",
        });

        gsap.set(logo, {
            opacity: 1,
        });

        const tl = gsap.timeline();

        /*
         * Globe slowly appears
         */
        tl.to(globe, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
        });

        /*
         * Letters appear one by one
         */
        tl.to(
            split.chars,
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.16,
                ease: "power3.out",
            },
            "-=0.7"
        );

        return () => {
            tl.kill();
            split.revert();
        };
    }, []);

    const handleLottieComplete = () => {
        const loader = loaderRef.current;
        const globe = globeRef.current;
        const logo = logoRef.current;

        const navbarLogo =
            document.querySelector("#navbar-logo");

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
         * Get the positions of the two logos
         */
        const logoRect =
            logo.getBoundingClientRect();

        const navbarRect =
            navbarLogo.getBoundingClientRect();

        const logoCenterX =
            logoRect.left +
            logoRect.width / 2;

        const logoCenterY =
            logoRect.top +
            logoRect.height / 2;

        const navbarCenterX =
            navbarRect.left +
            navbarRect.width / 2;

        const navbarCenterY =
            navbarRect.top +
            navbarRect.height / 2;

        const moveX =
            navbarCenterX - logoCenterX;

        const moveY =
            navbarCenterY - logoCenterY;

        /*
         * Move WANDERLY to navbar
         * while globe fades.
         */
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(navbarLogo, {
                    opacity: 1,
                });

                onComplete?.();
            },
        });

        /*
         * WANDERLY travels to navbar
         */
        tl.to(logo, {
            x: moveX,
            y: moveY,
            scale: 1.1,
            duration: 1.0,
            ease: "power4.inOut",
        });

        /*
         * Globe fades at the same time
         */
        tl.to(
            globe,
            {
                opacity: 0,
                scale: 1.05,
                duration: 0.95,
                ease: "power2.inOut",
            },
            "<"
        );

        /*
         * Fade loader away
         */
        tl.to(loader, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
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

            {/* Very subtle premium glow */}
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
                style={{ opacity: 0 }}
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

                {/* YOUR LOTTIE */}
                <Lottie
                    animationData={travelLoading}
                    loop={false}
                    autoplay
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
                    style={{ opacity: 0 }}
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
                        text-base
                        font-medium
                        tracking-[0.16em]
                        text-white

                        sm:text-lg
                        md:text-xl
                    "
                >
                    WANDERLY
                </div>

            </div>
        </div>
    );
}

export default PageLoader;