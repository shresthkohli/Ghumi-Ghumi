import { useRef } from "react";
import { useAuth } from "../context/Authcontext";

function PassportCard({ passport }) {

    const passportRef = useRef(null);
    const { user } = useAuth();

    function handleMouseMove(e) {

        const card = passportRef.current;

        if (!card) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (rect.height / 2 - y) / 30;
        const rotateY = (x - rect.width / 2) / 30;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave() {

        if (!passportRef.current) return;

        passportRef.current.style.transform =
            "rotateX(0deg) rotateY(0deg)";
    }

    if (!passport) return null;

    return (

        <div
            className="w-full"
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
                aspect-[3/4]
                w-full
                max-w-[520px]
                overflow-hidden
                rounded-[2.5rem]
                bg-gradient-to-br
                from-tertiary
                to-tertiary-dark
                p-7
                text-white
                shadow-warm-lg
                flex
                flex-col
            "
            >

                {/* Texture */}

                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />

                {/* Shine */}

                <div
                    className="
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

                <div className="relative">

                    <div className="flex justify-between items-start gap-6">

                        <div className="flex-1">

                            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                                Digital Passport
                            </p>

                            <h2 className="
                            mt-3
                            font-display
                            text-2xl
                            leading-none
                            break-words
                        ">
                                {user.name}
                            </h2>

                        </div>

                        <span className="
                        material-symbols-outlined
                        text-[42px]
                        text-white/60
                        shrink-0
                    ">
                            qr_code_2
                        </span>

                    </div>

                    <div className="mt-6">

                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                            Passport No.
                        </p>

                        <p className="mt-2 text-base font-semibold tracking-[0.18em]">
                            {passport.passportNumber}
                        </p>

                    </div>

                </div>

                {/* STAMPS */}

                <div className="mt-8 flex-1">

                    <h3 className="font-body uppercase tracking-[0.3em] text-xs text-white/50 mb-4">
                        Travel Stamps
                    </h3>

                    <div className="grid grid-cols-3 gap-4">

                        {

                            Array.from({ length: 6 }).map((_, index) => {

                                const stamp = passport.stamps[index];

                                if (!stamp) {

                                    return (
                                        <div
                                            key={index}
                                            className="aspect-square"
                                        />
                                    );

                                }

                                return (

                                    <div
                                        key={stamp.id}
                                        className="
                                        w-27
                                        h-27
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
                                        hover:scale-110
                                        hover:bg-white/15
                                    "
                                    >

                                        <span className="material-symbols-outlined text-2xl mb-1">
                                            {stamp.icon}
                                        </span>

                                        <span className="text-[9px] uppercase text-center leading-tight px-2">
                                            {stamp.name}
                                        </span>

                                    </div>

                                );

                            })

                        }

                    </div>

                </div>

                {/* FOOTER */}

                <div className="mt-6 pt-6 border-t border-white/10">

                    <div className="flex justify-between gap-6">

                        <div>

                            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                                Member Since
                            </p>

                            <p className="mt-2 font-semibold">

                                {
                                    new Date(passport.memberSince)
                                        .toLocaleDateString(
                                            "en-IN",
                                            {
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )
                                }

                            </p>

                        </div>

                        <div className="text-right">

                            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                                Expiration
                            </p>

                            <p className="mt-2 max-w-[180px] text-sm font-semibold leading-tight">
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