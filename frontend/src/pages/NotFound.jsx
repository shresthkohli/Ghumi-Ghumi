import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-24 bg-surface text-center">
            <div className="max-w-xl mx-auto flex flex-col items-center">
                {/* Vintage / Editorial Compass Accent */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mb-6 sm:mb-8 text-primary shadow-sm">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                        explore_off
                    </span>
                </div>

                <span className="font-body text-xs sm:text-label-lg font-bold text-primary tracking-[0.25em] uppercase mb-3">
                    Error 404 — Charting Unknown Waters
                </span>

                <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-4 leading-tight">
                    Off the Beaten Path
                </h1>

                <p className="font-body text-sm sm:text-base md:text-body-lg text-on-surface-variant max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
                    The expedition route you are seeking cannot be found. Perhaps the coordinates shifted, or this trail is yet to be charted.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto justify-center">
                    <Link
                        to="/discover"
                        className="glossy-button inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-body text-sm font-semibold tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                    >
                        <span className="material-symbols-outlined text-lg">explore</span>
                        <span>Return to Discover</span>
                    </Link>

                    <Link
                        to="/destinations"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-outline-variant bg-surface-container-high text-on-surface font-body text-sm font-semibold hover:bg-surface-container-highest transition-colors w-full sm:w-auto"
                    >
                        <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                        <span>Explore Destinations</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
