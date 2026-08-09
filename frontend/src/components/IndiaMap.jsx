import { useEffect } from "react";
import IndiaSvg from "../assets/india-map-premium.svg?react";

const STATE_TO_CODE = {
    "Andaman and Nicobar Islands": "IN-AN",
    "Andhra Pradesh": "IN-AP",
    "Arunachal Pradesh": "IN-AR",
    "Assam": "IN-AS",
    "Bihar": "IN-BR",
    "Chandigarh": "IN-CH",
    "Chhattisgarh": "IN-CT",
    "Dadra and Nagar Haveli and Daman and Diu": "IN-DH",
    "Delhi": "IN-DL",
    "Goa": "IN-GA",
    "Gujarat": "IN-GJ",
    "Haryana": "IN-HR",
    "Himachal Pradesh": "IN-HP",
    "Jammu and Kashmir": "IN-JK",
    "Jharkhand": "IN-JH",
    "Karnataka": "IN-KA",
    "Kerala": "IN-KL",
    "Ladakh": "IN-LA",
    "Lakshadweep": "IN-LD",
    "Madhya Pradesh": "IN-MP",
    "Maharashtra": "IN-MH",
    "Manipur": "IN-MN",
    "Meghalaya": "IN-ML",
    "Mizoram": "IN-MZ",
    "Nagaland": "IN-NL",
    "Odisha": "IN-OR",
    "Puducherry": "IN-PY",
    "Punjab": "IN-PB",
    "Rajasthan": "IN-RJ",
    "Sikkim": "IN-SK",
    "Tamil Nadu": "IN-TN",
    "Telangana": "IN-TS",
    "Tripura": "IN-TR",
    "Uttar Pradesh": "IN-UP",
    "Uttarakhand": "IN-UT",
    "West Bengal": "IN-WB",
};

function IndiaMap({
    visitedStates = [],
    visitedCount = 0,
    totalStates = 28,
}) {

    useEffect(() => {
        /*
         * Remove previous visited classes
         */
        document
            .querySelectorAll(".india-map .visited")
            .forEach((state) => {
                state.classList.remove("visited");
            });

        /*
         * Add visited class
         */
        visitedStates.forEach((stateName) => {

            const stateCode = STATE_TO_CODE[stateName];

            if (!stateCode) return;

            const state = document.getElementById(stateCode);

            if (!state) {
                console.warn(
                    `State element not found: ${stateCode}`
                );
                return;
            }

            state.classList.add("visited");
        });

    }, [visitedStates]);

    const progress = Math.min(
        (visitedCount / totalStates) * 100,
        100
    );

    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-[2.5rem]
                bg-[#12372A]
                border
                border-[#1F5A45]
                shadow-[0_20px_60px_rgba(0,0,0,.45)]
                p-8
            "
        >

            {/* =====================================================
                SVG MAP STYLES
            ====================================================== */}

            <style>
                {`

                    /* -----------------------------------------
                       Base state styling
                    ----------------------------------------- */

                    .india-map svg path,
                    .india-map svg polygon,
                    .india-map svg g {
                        transition:
                            fill 0.5s ease,
                            stroke 0.5s ease,
                            filter 0.5s ease;
                    }


                    /* -----------------------------------------
                       UNVISITED STATES
                    ----------------------------------------- */

                    .india-map svg path,
                    .india-map svg polygon {
                        fill: #050807 !important;
                        stroke: transparent !important;
                        stroke-width: 0 !important;
                    }


                    /* -----------------------------------------
                       VISITED STATES
                    ----------------------------------------- */

                    .india-map svg .visited {
                        fill: url("#visitedGoldGradient") !important;

                        stroke: #D9B45C !important;
                        stroke-width: 0.8 !important;

                        filter:
                            drop-shadow(
                                0 0 4px rgba(217, 180, 92, 0.45)
                            )
                            drop-shadow(
                                0 0 12px rgba(217, 180, 92, 0.20)
                            );
                    }


                    /* -----------------------------------------
                       Hover
                    ----------------------------------------- */

                    .india-map svg .visited:hover {
                        filter:
                            drop-shadow(
                                0 0 7px rgba(246, 227, 156, 0.75)
                            )
                            drop-shadow(
                                0 0 18px rgba(217, 180, 92, 0.45)
                            );

                        cursor: pointer;
                    }


                    .india-map svg path:hover {
                        fill: #111A16 !important;
                    }


                    .india-map svg .visited:hover {
                        fill: url("#visitedGoldGradient") !important;
                    }


                    /* -----------------------------------------
                       Country outline
                    ----------------------------------------- */

                    .india-map svg > path.country-outline {
                        fill: none !important;
                        stroke: #D9B45C !important;
                        stroke-width: 2 !important;
                        opacity: 0.9;
                        filter:
                            drop-shadow(
                                0 0 5px rgba(217, 180, 92, 0.65)
                            )
                            drop-shadow(
                                0 0 16px rgba(217, 180, 92, 0.3)
                            );
                    }

                `}
            </style>


            {/* =====================================================
                GRADIENT DEFINITION
            ====================================================== */}

            <svg
                width="0"
                height="0"
                className="absolute"
                aria-hidden="true"
            >
                <defs>

                    <linearGradient
                        id="visitedGoldGradient"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#3A2A0D"
                        />

                        <stop
                            offset="35%"
                            stopColor="#8F6B25"
                        />

                        <stop
                            offset="65%"
                            stopColor="#D9B45C"
                        />

                        <stop
                            offset="100%"
                            stopColor="#F6E39C"
                        />
                    </linearGradient>

                </defs>
            </svg>


            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="flex justify-between items-start mb-8">

                <div>

                    <h2 className="font-display text-3xl text-white">
                        India Exploration
                    </h2>

                    <p className="mt-2 font-body text-white/70">
                        {visitedCount} of {totalStates} states explored
                    </p>

                </div>


                <div
                    className="
                        w-14
                        h-14
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                    "
                >

                    <span
                        className="
                            material-symbols-outlined
                            text-[#F2C66D]
                            text-3xl
                        "
                    >
                        public
                    </span>

                </div>

            </div>


            {/* =====================================================
                PROGRESS BAR
            ====================================================== */}

            <div
                className="
                    h-3
                    rounded-full
                    bg-black/30
                    overflow-hidden
                    mb-8
                "
            >

                <div
                    className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-[#C88A2B]
                        via-[#E8C36A]
                        to-[#F6E39C]
                        transition-all
                        duration-700
                        shadow-[0_0_12px_rgba(232,195,106,.45)]
                    "
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>


            {/* =====================================================
                MAP
            ====================================================== */}

            <div
                className="
                    india-map
                    relative
                    w-full
                    flex-1
                    rounded-[2rem]
                    bg-[#12372A]
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    p-2
                    sm:p-4
                    min-h-[440px]
                "
            >

                {/* Golden aura */}

                <div
                    className="
                        absolute
                        inset-0
                        pointer-events-none
                        flex
                        items-center
                        justify-center
                    "
                >

                    <div
                        className="
                            w-[80%]
                            aspect-square
                            rounded-full
                            bg-[#D9B45C]/15
                            blur-[80px]
                        "
                    />

                </div>


                {/* Secondary darker aura */}

                <div
                    className="
                        absolute
                        inset-0
                        pointer-events-none
                        bg-[radial-gradient(
                            ellipse_at_center,
                            rgba(217,180,92,0.08),
                            transparent 65%
                        )]
                    "
                />


                {/* SVG */}

                <div
                    className="
                        relative
                        z-10
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                    "
                >

                    <IndiaSvg
                        className="
                            block
                            w-full
                            h-auto
                            max-h-[580px]
                            object-contain
                        "
                    />

                </div>

            </div>

        </section>
    );
}

export default IndiaMap;