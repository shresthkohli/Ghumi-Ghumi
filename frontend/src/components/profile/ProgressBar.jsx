function ProgressBar({
    value,
    max,
    label,
    height = "h-3",
    showPercentage = true,
}) {

    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="w-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="font-body text-label-lg text-white/90">
                    {label}
                </span>

                <span className="font-body text-label-md text-primary-fixed font-semibold">
                    {value} / {max}
                </span>
            </div>

            {/* Progress Track */}
            <div
                className={`relative overflow-hidden rounded-full bg-white/10 ${height}`}
            >

                {/* Filled Portion */}
                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-fixed to-tertiary transition-all duration-1000 ease-out"
                    style={{
                        width: `${percentage}%`,
                    }}
                >

                    {/* Animated Shine */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_3s_infinite]" />

                </div>

            </div>

            {showPercentage && (
                <p className="mt-3 font-body text-sm text-white/60">
                    {percentage.toFixed(0)}% Complete
                </p>
            )}

        </div>
    );
}

export default ProgressBar;