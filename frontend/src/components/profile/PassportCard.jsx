import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";

function PassportCard({ passport }) {
    const passportRef = useRef(null);
    const { user } = useAuth();

    function handleMouseMove(e) {
        const card = passportRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (rect.height / 2 - y) / 25;
        const rotateY = (x - rect.width / 2) / 25;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave() {
        if (!passportRef.current) return;
        passportRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    if (!passport) return null;

    const displayName = user?.name || "Explorer";

    return (
        <div
            className="w-full flex justify-center"
            style={{ perspective: "2000px" }}
        >
            <div
                ref={passportRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transition: "transform 0.4s ease-out",
                }}
                className="
                    relative
                    w-full
                    max-w-[520px]
                    overflow-hidden
                    rounded-3xl
                    sm:rounded-[2.5rem]
                    bg-gradient-to-br
                    from-tertiary
                    to-tertiary-dark
                    p-5
                    sm:p-7
                    md:p-8
                    text-white
                    shadow-warm-lg
                    flex
                    flex-col
                    justify-between
                    transition-shadow
                    duration-300
                    hover:shadow-2xl
                "
            >
                {/* Texture */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />

                {/* Shine on hover */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                        -translate-x-full
                        hover:translate-x-full
                        transition-transform
                        duration-1000
                    "
                />

                {/* HEADER */}
                <div className="relative z-10">
                    <div className="flex justify-between items-start gap-4 sm:gap-6">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/50 font-semibold">
                                Digital Passport
                            </p>

                            <h2 className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl md:text-3xl leading-tight font-bold break-words">
                                {displayName}
                            </h2>
                        </div>

                        <span className="material-symbols-outlined text-[32px] sm:text-[42px] text-white/60 shrink-0">
                            qr_code_2
                        </span>
                    </div>

                    <div className="mt-4 sm:mt-6">
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/50 font-semibold">
                            Passport No.
                        </p>

                        <p className="mt-1 sm:mt-1.5 text-sm sm:text-base font-semibold tracking-[0.15em] sm:tracking-[0.18em] text-amber-300/90 font-mono">
                            {passport.passportNumber}
                        </p>
                    </div>
                </div>

                {/* STAMPS */}
                <div className="relative z-10 mt-6 sm:mt-8 flex-1">
                    <h3 className="font-body uppercase tracking-[0.3em] text-[11px] sm:text-xs text-white/50 mb-3 sm:mb-4 font-semibold">
                        Travel Stamps
                    </h3>

                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
                        {Array.from({ length: 6 }).map((_, index) => {
                            const stamp = passport.stamps?.[index];

                            if (!stamp) {
                                return (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-full border border-dashed border-white/10 flex items-center justify-center"
                                    />
                                );
                            }

                            return (
                                <div
                                    key={stamp.id || index}
                                    className="
                                        w-16
                                        h-16
                                        sm:w-20
                                        sm:h-20
                                        md:w-24
                                        md:h-24
                                        mx-auto
                                        rounded-full
                                        bg-white/10
                                        ring-1
                                        ring-white/20
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        transition-all
                                        duration-300
                                        hover:scale-108
                                        hover:bg-white/20
                                        hover:ring-amber-300/40
                                        hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]
                                        cursor-pointer
                                        p-1
                                    "
                                    title={stamp.state || stamp.name}
                                >
                                    <span className="material-symbols-outlined text-lg sm:text-2xl mb-0.5 sm:mb-1 text-amber-300">
                                        {stamp.icon || "pin_drop"}
                                    </span>

                                    <span className="text-[8px] sm:text-[9px] uppercase text-center font-semibold leading-tight px-1 text-white/90 truncate max-w-full">
                                        {stamp.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                    <div className="flex justify-between gap-6 items-center">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-semibold">
                                Member Since
                            </p>

                            <p className="mt-1 font-semibold text-sm">
                                {new Date(passport.memberSince).toLocaleDateString(
                                    "en-IN",
                                    {
                                        month: "short",
                                        year: "numeric"
                                    }
                                )}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-semibold">
                                Expiration
                            </p>

                            <p className="mt-1 max-w-[180px] text-xs font-semibold leading-tight text-white/90">
                                {passport.expirationDate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PassportCard;