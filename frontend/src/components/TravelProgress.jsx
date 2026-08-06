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

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="font-display text-3xl text-on-surface">
                        Travel Progress
                    </h2>

                    <p className="mt-2 font-body text-on-surface-variant">
                        Every destination brings you closer to completing your map.
                    </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container">

                    <span className="material-symbols-outlined text-3xl text-primary">
                        timeline
                    </span>

                </div>

            </div>

            {/* Progress Bar */}

            <div className="mt-10">

                <div className="mb-3 flex justify-between">

                    <span className="font-body text-label-lg text-on-surface">
                        India Completion
                    </span>

                    <span className="font-body font-semibold text-primary">
                        {statesVisited}/{TOTAL_STATES} States
                    </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-outline/10">

                    <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Stats */}

            <div className="mt-12 space-y-6">

                {/* First Row */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <StatCard
                        value={statesVisited}
                        label="States Visited"
                        icon="public"
                        accent
                    />

                    <StatCard
                        value={citiesVisited}
                        label="Cities Explored"
                        icon="location_city"
                    />

                    <StatCard
                        value={favoriteCount}
                        label="Favorites"
                        icon="favorite"
                    />

                </div>

                {/* Second Row */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <StatCard
                        value={reviewCount}
                        label="Reviews"
                        icon="rate_review"
                    />

                    <StatCard
                        value={itineraryCount}
                        label="Itineraries"
                        icon="route"
                    />

                </div>

            </div>

        </section>

    );

}

export default TravelProgress;