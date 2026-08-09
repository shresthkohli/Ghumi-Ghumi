import { categories, budgetOptions } from "../../data/destinations";

function FilterSidebar({
    activeCategories = [],
    onCategoryToggle,
    onCatefotyToggle,
    activeBudgets = [],
    onBudgetToggle,
    onClearAll
}) {
    const handleCategoryClick = onCategoryToggle || onCatefotyToggle;

    const totalActiveFilters =
        activeCategories.length + activeBudgets.length;

    return (
        <aside className="w-full md:w-80 shrink-0">
            <div className="bg-surface-container-highest p-6 sm:p-8 rounded-4xl shadow-lg sticky top-24 border border-white/20 space-y-6">
                {/* Header with Compass */}
                <div className="flex flex-col items-center text-center pb-5 border-b border-outline-variant/60">
                    <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mb-3 bg-white/30 backdrop-blur-xs shadow-xs">
                        <span className="material-symbols-outlined text-primary text-4xl">
                            explore
                        </span>
                    </div>
                    <span className="font-body text-label-md uppercase tracking-widest text-primary font-semibold">
                        Explore Horizons
                    </span>

                    {totalActiveFilters > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary">
                                {totalActiveFilters} {totalActiveFilters === 1 ? "filter" : "filters"} applied
                            </span>
                            {onClearAll && (
                                <button
                                    type="button"
                                    onClick={onClearAll}
                                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        close
                                    </span>
                                    Reset
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Filter by Category */}
                <div>
                    <div className="flex items-center justify-between mb-3.5">
                        <h3 className="font-display text-headline-md text-on-surface flex items-center gap-2">
                            Filter by
                        </h3>
                        {activeCategories.length > 0 && (
                            <span className="text-xs font-medium text-primary">
                                {activeCategories.length} selected
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const isActive = activeCategories.includes(category.id);
                            return (
                                <button
                                    type="button"
                                    key={category.id}
                                    onClick={() => handleCategoryClick && handleCategoryClick(category.id)}
                                    className={`px-4 py-2 rounded-full text-label-lg flex items-center gap-2 transition-all cursor-pointer select-none ${
                                        isActive
                                            ? "bg-primary text-on-primary shadow-md scale-[1.02]"
                                            : "bg-white/50 text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-body-lg">
                                        {category.icon}
                                    </span>
                                    <span>{category.label}</span>
                                    {isActive && (
                                        <span className="material-symbols-outlined text-sm ml-0.5">
                                            check
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <hr className="border-outline-variant/60" />

                {/* Filter by Budget */}
                <div>
                    <div className="flex items-center justify-between mb-3.5">
                        <h3 className="font-display text-headline-md text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">
                                payments
                            </span>
                            By Budget
                        </h3>
                        {activeBudgets.length > 0 && (
                            <span className="text-xs font-medium text-primary">
                                {activeBudgets.length} selected
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {budgetOptions.map((budget) => {
                            const isActive = activeBudgets.includes(budget.id);
                            return (
                                <button
                                    type="button"
                                    key={budget.id}
                                    onClick={() => onBudgetToggle && onBudgetToggle(budget.id)}
                                    className={`px-4 py-2.5 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer select-none ${
                                        isActive
                                            ? "bg-primary text-on-primary shadow-md"
                                            : "bg-white/50 text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-primary/10 text-primary"
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-base">
                                                {budget.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-label-lg font-semibold leading-tight">
                                                {budget.label}
                                            </div>
                                            <div
                                                className={`text-xs ${
                                                    isActive ? "text-white/80" : "text-on-surface-variant/70"
                                                }`}
                                            >
                                                {budget.description}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`font-mono text-xs px-2 py-0.5 rounded-full font-bold ${
                                                isActive
                                                    ? "bg-white/25 text-white"
                                                    : "bg-surface-container text-primary"
                                            }`}
                                        >
                                            {budget.tier}
                                        </span>
                                        {isActive && (
                                            <span className="material-symbols-outlined text-base">
                                                check_circle
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Reset button when active filters exist */}
                {totalActiveFilters > 0 && onClearAll && (
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={onClearAll}
                            className="w-full py-2.5 px-4 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all text-label-md flex items-center justify-center gap-2 font-medium cursor-pointer shadow-xs"
                        >
                            <span className="material-symbols-outlined text-base">
                                filter_alt_off
                            </span>
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default FilterSidebar;