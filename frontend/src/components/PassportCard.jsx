import { useRef } from "react";

function PassportCard({ passport }) {

    const passportRef = useRef(null);

    function handleMouseMove(e) {

        const card = passportRef.current;

        if (!card) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (rect.height / 2 - y) / 40;
        const rotateY = (x - rect.width / 2) / 40;

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
                    overflow-hidden
                    rounded-[2.5rem]
                    bg-gradient-to-br
                    from-tertiary
                    to-tertiary-dark
                    p-8
                    text-white
                    shadow-warm-lg
                "
            >

                {/* subtle texture */}

                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />

                {/* shine */}

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

                <div className="relative flex justify-between items-start">

                    <div>

                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                            Digital Passport
                        </p>

                        <h2 className="mt-2 font-display text-3xl">
                            Wanderly
                        </h2>

                    </div>

                    <span className="material-symbols-outlined text-4xl text-white/70">
                        qr_code_2
                    </span>

                </div>

                {/* STAMPS */}

                <div className="mt-10">

                    <h3 className="font-body uppercase tracking-[0.3em] text-xs text-white/50 mb-5">
                        Travel Stamps
                    </h3>

                    {
                        passport.stamps.length === 0 ?

                            (

                                <div
                                    className="
                                        rounded-3xl
                                        border-2
                                        border-dashed
                                        border-white/15
                                        py-12
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        text-center
                                    "
                                >

                                    <span className="material-symbols-outlined text-5xl text-white/40">
                                        travel_explore
                                    </span>

                                    <p className="mt-4 font-display text-lg">
                                        No stamps yet
                                    </p>

                                    <p className="mt-2 text-sm text-white/60 max-w-xs">
                                        Complete your first journey to receive your
                                        first passport stamp.
                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="grid grid-cols-4 gap-4">

                                    {
                                        passport.stamps.map((stamp) => (

                                            <div
                                                key={stamp.label}
                                                className="
                                                    aspect-square
                                                    rounded-full
                                                    border-2
                                                    border-dashed
                                                    border-white/20
                                                    flex
                                                    flex-col
                                                    items-center
                                                    justify-center
                                                    transition-all
                                                    duration-300
                                                    hover:scale-105
                                                "
                                            >

                                                <span className="material-symbols-outlined text-3xl mb-1">
                                                    {stamp.icon}
                                                </span>

                                                <span className="text-[10px] uppercase text-center leading-tight px-1">
                                                    {stamp.label}
                                                </span>

                                            </div>

                                        ))
                                    }

                                </div>

                            )

                    }

                </div>

                {/* FOOTER */}

                <div className="mt-10 pt-8 border-t border-white/10 flex justify-between">

                    <div>

                        <p className="text-xs uppercase tracking-widest text-white/50">
                            Member Since
                        </p>

                        <p className="mt-1 font-semibold">

                            {
                                new Date(passport.memberSince)
                                    .toLocaleDateString("en-IN", {
                                        month: "short",
                                        year: "numeric",
                                    })
                            }

                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-xs uppercase tracking-widest text-white/50">
                            Passport No.
                        </p>

                        <p className="mt-1 font-semibold">
                            {passport.passportNumber}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PassportCard;