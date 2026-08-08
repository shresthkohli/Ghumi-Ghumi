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
        console.log("useEffect fired");
        
        // remove old styles

        document
            .querySelectorAll(".india-map .visited")
            .forEach((state) => {

                state.classList.remove("visited");

            });

        // highlight visited states

        visitedStates.forEach((stateName) => {

            const stateCode = STATE_TO_CODE[stateName];

            if (!stateCode) return;

            const state = document.getElementById(stateCode);

            if (state) {
                state.classList.add("visited");
            }

        });

        console.log(visitedStates);

    }, [visitedStates]);

    const progress =
        (visitedCount / totalStates) * 100;

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

            {/* Header */}

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

                    <span className="material-symbols-outlined text-[#F2C66D] text-3xl">

                        public

                    </span>

                </div>

            </div>

            {/* Progress */}

            <div
                className="
                    h-3
                    rounded-full
                    bg-outline/10
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
                    "

                    style={{

                        width: `${progress}%`

                    }}

                />

            </div>

            {/* SVG */}

            <div
                className="
                    india-map
                    relative
                    flex
                    items-center
                    justify-center

                    h-[55vw]
                    max-h-[700px]
                    min-h-[420px]

                    rounded-[2rem]
                    bg-[#12372A]
                    overflow-hidden
                "
            >

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
                        h-[75%]
                        w-[75%]
                        rounded-full
                        bg-[#D9B45C]/15
                        blur-[60px]
                    "
                    />
                </div>

                <IndiaSvg
                    className="
                        w-full
                        h-full
                        object-contain
                        drop-shadow-[0_0_30px_rgba(217,180,92,.18)]
                    "
                />

            </div>

        </section>

    );

}

export default IndiaMap;