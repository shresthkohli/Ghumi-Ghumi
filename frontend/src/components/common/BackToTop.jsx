import { useState, useEffect } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-surface-container-high/90 text-on-surface-variant backdrop-blur-md border border-outline-variant/30 shadow-lg hover:bg-primary hover:text-white hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
                visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <span className="material-symbols-outlined text-xl sm:text-2xl">
                arrow_upward
            </span>
        </button>
    );
}
