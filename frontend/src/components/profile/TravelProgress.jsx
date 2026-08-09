import StatCard from "./StatCard";

function TravelProgress({ stats = {} }) {
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
        <section className="rounded-[2.5rem] bg-surface-container border border-outline/20 p-8 shadow-lg transition-all duration-300">
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

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-white shadow-md transition-transform duration-300 hover:scale-105 hover:rotate-3">
                    <span className="material-symbols-outlined text-3xl">
                        timeline
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
                <div className="mb-3 flex justify-between items-center">
                    <span className="font-body text-sm font-medium text-on-surface">
                        India Completion
                    </span>

                    <span className="font-body font-semibold text-primary text-sm">
                        {statesVisited}/{TOTAL_STATES} States ({Math.round(progress)}%)
                    </span>
                </div>

                <div className="h-3.5 overflow-hidden rounded-full bg-outline/10 p-0.5">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-1000 ease-out shadow-sm"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-10 space-y-6">
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