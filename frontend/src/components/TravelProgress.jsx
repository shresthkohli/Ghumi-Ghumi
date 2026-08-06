import StatCard from "./StatCard";

function TravelProgress({ stats }) {

    const {
        statesVisited = 0,
        citiesVisited = 0,
        reviewCount = 0,
        favoriteCount = 0,
        itineraryCount = 0,
    } = stats;

    const TOTAL_STATES = 28;

    const progress = Math.min(
        (statesVisited / TOTAL_STATES) * 100,
        100
    );

    return (

        <section className="rounded-[2.5rem] bg-surface-container border border-outline/20 p-8 shadow-lg">

            {/* Heading */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="font-display text-3xl text-on-surface">
                        Travel Progress
                    </h2>

                    <p className="mt-2 font-body text-on-surface-variant">
                        Every destination brings you closer to completing your map.
                    </p>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center">

                    <span className="material-symbols-outlined text-primary text-3xl">
                        timeline
                    </span>

                </div>

            </div>

            {/* Progress */}

            <div className="mt-10">

                <div className="flex justify-between mb-3">

                    <span className="font-body text-label-lg text-on-surface">

                        India Completion

                    </span>

                    <span className="font-body font-semibold text-primary">

                        {statesVisited}/{TOTAL_STATES} States

                    </span>

                </div>

                <div className="h-4 rounded-full bg-outline/10 overflow-hidden">

                    <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

            </div>

            {/* Stats */}

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-5">

                <StatCard
                    value={statesVisited}
                    label="States"
                />

                <StatCard
                    value={citiesVisited}
                    label="Cities"
                />

                <StatCard
                    value={favoriteCount}
                    label="Favorites"
                />

                <StatCard
                    value={reviewCount}
                    label="Reviews"
                />

                <StatCard
                    value={itineraryCount}
                    label="Itineraries"
                />

            </div>

        </section>

    );

}

export default TravelProgress;