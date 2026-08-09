import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LoginCard from "./LoginCard";

export default function LoginModal({
    open,
    onClose
}) {
    const [isClosing, setIsClosing] = useState(false);
    const backdropRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        setIsClosing(false);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    // GSAP Entrance
    useGSAP(() => {
        if (open && backdropRef.current && modalRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.28, ease: "power2.out" }
            );
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.88, y: 35, rotateX: 6 },
                { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 0.45, ease: "back.out(1.4)" }
            );
        }
    }, [open]);

    function handleAnimatedClose() {
        if (isClosing) return;
        setIsClosing(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsClosing(false);
                onClose();
            },
        });

        if (modalRef.current && backdropRef.current) {
            tl.to(
                modalRef.current,
                { opacity: 0, scale: 0.92, y: 20, duration: 0.22, ease: "power2.in" },
                0
            );
            tl.to(
                backdropRef.current,
                { opacity: 0, duration: 0.22, ease: "power2.in" },
                0
            );
        } else {
            onClose();
        }
    }

    // Escape listener
    useEffect(() => {
        if (!open) return;
        function handleEscape(e) {
            if (e.key === "Escape") {
                handleAnimatedClose();
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [open, isClosing]);

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
            style={{ perspective: "1000px" }}
        >
            <div
                ref={backdropRef}
                onClick={handleAnimatedClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-md"
            >
                <button
                    onClick={handleAnimatedClose}
                    type="button"
                    className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-on-surface shadow-xl transition-all hover:scale-110 hover:bg-surface-container cursor-pointer"
                >
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                    <LoginCard
                        onSucces={handleAnimatedClose}
                    />
                </div>
            </div>
        </div>
    );
}