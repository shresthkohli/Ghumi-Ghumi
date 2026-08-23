import { useEffect } from "react";
import { categories, budgetOptions } from "../../data/destinations";

function FilterSidebar({
    activeCategories = [],
    onCategoryToggle,
    onCatefotyToggle,
    activeBudgets = [],
    onBudgetToggle,
    onClearAll,
    isOpen = false,
    onClose,
    totalResults,
}) {
    const handleCategoryClick = onCategoryToggle || onCatefotyToggle;

    const totalActiveFilters = activeCategories.length + activeBudgets.length;

    // Lock body scroll and listen for Escape key when mobile drawer is open
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape" && onClose) {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            <div
                role="presentation"
                onClick={onClose}
                className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!isOpen}
            />

            {/* Sidebar Container (Slide-in drawer on mobile, sticky sidebar on desktop) */}
            <aside
                className={`fixed md:static top-0 left-0 bottom-0 z-50 md:z-auto w-[85vw] max-w-[340px] md:w-80 md:max-w-none h-full md:h-auto shrink-0 transition-transform duration-300 ease-out md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
                aria-label="Destination filters"
            >
                <div className="bg-surface-container-highest h-full md:h-auto flex flex-col justify-between p-5 sm:p-6 md:p-8 rounded-r-3xl md:rounded-4xl shadow-2xl md:shadow-lg md:sticky md:top-24 border-r md:border border-white/20 overflow-y-auto">
                    {/* Mobile Header Bar */}
                    <div className="flex items-center justify-between pb-4 mb-2 border-b border-outline-variant/50 md:hidden">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-2xl">
                                tune
                            </span>
                            <h2 className="font-display text-lg font-bold text-on-surface">
                                Filters
                            </h2>
                            {totalActiveFilters > 0 && (
                                <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                                    {totalActiveFilters}
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-9 h-9 rounded-full bg-white/60 hover:bg-white text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close filters"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Header with Compass (Desktop & Mobile drawer top) */}
                        <div className="flex flex-col items-center text-center pb-5 border-b border-outline-variant/60">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mb-3 bg-white/30 backdrop-blur-xs shadow-xs">
                                <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl">
                                    explore
                                </span>
                            </div>
                            <span className="font-body text-xs sm:text-label-md uppercase tracking-widest text-primary font-semibold">
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
                                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-label-lg flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none ${
                                                isActive
                                                    ? "bg-primary text-on-primary shadow-md scale-[1.02]"
                                                    : "bg-white/50 text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-base sm:text-body-lg">
                                                {category.icon}
                                            </span>
                                            <span>{category.label}</span>
                                            {isActive && (
                                                <span className="material-symbols-outlined text-xs sm:text-sm ml-0.5">
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
                                            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer select-none ${
                                                isActive
                                                    ? "bg-primary text-on-primary shadow-md"
                                                    : "bg-white/50 text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-2.5">
                                                <div
                                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                                                        isActive
                                                            ? "bg-white/20 text-white"
                                                            : "bg-primary/10 text-primary"
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-sm sm:text-base">
                                                        {budget.icon}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-xs sm:text-label-lg font-semibold leading-tight">
                                                        {budget.label}
                                                    </div>
                                                    <div
                                                        className={`text-[11px] sm:text-xs ${
                                                            isActive ? "text-white/80" : "text-on-surface-variant/70"
                                                        }`}
                                                    >
                                                        {budget.description}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                                <span
                                                    className={`font-mono text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
                                                        isActive
                                                            ? "bg-white/25 text-white"
                                                            : "bg-surface-container text-primary"
                                                    }`}
                                                >
                                                    {budget.tier}
                                                </span>
                                                {isActive && (
                                                    <span className="material-symbols-outlined text-sm sm:text-base">
                                                        check_circle
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reset button when active filters exist (Desktop) */}
                        {totalActiveFilters > 0 && onClearAll && (
                            <div className="pt-2 hidden md:block">
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

                    {/* Mobile Drawer Bottom Action Bar */}
                    <div className="pt-6 mt-6 border-t border-outline-variant/50 md:hidden flex flex-col gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-3 px-4 rounded-full bg-primary text-on-primary font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                        >
                            <span>
                                {typeof totalResults === "number"
                                    ? `Show ${totalResults} Destination${totalResults === 1 ? "" : "s"}`
                                    : "Apply Filters"}
                            </span>
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                        {totalActiveFilters > 0 && onClearAll && (
                            <button
                                type="button"
                                onClick={onClearAll}
                                className="w-full py-2 px-4 rounded-full text-xs text-primary font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                                Reset All Filters
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

export default FilterSidebar;