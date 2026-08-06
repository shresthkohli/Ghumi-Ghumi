import { useEffect } from "react";
import IndiaSvg from "../assets/india-map.svg?react";


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

    }, [visitedStates]);

    const progress =
        (visitedCount / totalStates) * 100;

    return (

        <section
            className="
                rounded-[2.5rem]
                bg-surface-container
                border
                border-outline/20
                shadow-lg
                p-8
            "
        >

            {/* Header */}

            <div className="flex justify-between items-start mb-8">

                <div>

                    <h2 className="font-display text-3xl text-on-surface">

                        India Exploration

                    </h2>

                    <p className="mt-2 font-body text-on-surface-variant">

                        {visitedCount} of {totalStates} states explored

                    </p>

                </div>

                <div
                    className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-primary-container
                        flex
                        items-center
                        justify-center
                    "
                >

                    <span className="material-symbols-outlined text-primary text-3xl">

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
                        bg-primary
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
                    rounded-3xl
                    bg-background
                    p-4
                "
            >

                <IndiaSvg
                    className="
                        w-full
                        h-auto
                    "
                />

            </div>

        </section>

    );

}

export default IndiaMap;