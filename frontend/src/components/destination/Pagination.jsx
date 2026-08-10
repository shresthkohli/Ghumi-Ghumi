import { useMemo } from "react";

/**
 * Generates an array of page numbers and ellipsis tokens for smart pagination windowing.
 * Supports large catalogs (50+ items, 10+ pages) without overflowing the viewport.
 */
function getPaginationRange(currentPage, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 1: Only right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftRange = [1, 2, 3, 4];
        return [...leftRange, "...", totalPages];
    }

    // Case 2: Only left dots
    if (!shouldShowLeftDots && !shouldShowRightDots) {
        const rightRange = [
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
        return [firstPageIndex, "...", ...rightRange];
    }

    // Case 3: Both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = [currentPage - 1, currentPage, currentPage + 1];
        return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage = 6,
}) {
    if (totalPages <= 1) return null;

    const paginationRange = useMemo(
        () => getPaginationRange(currentPage, totalPages),
        [currentPage, totalPages]
    );

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : null;

    return (
        <nav
            aria-label="Destinations pagination"
            className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-3 sm:gap-4 w-full"
        >
            {/* Item Count Range Indicator */}
            {totalItems && (
                <p className="font-body text-xs sm:text-sm text-on-surface-variant font-medium text-center">
                    Showing <span className="font-bold text-on-surface">{startItem}–{endItem}</span> of{" "}
                    <span className="font-bold text-on-surface">{totalItems}</span> destinations
                    <span className="opacity-70 ml-1.5 font-normal">(Page {currentPage} of {totalPages})</span>
                </p>
            )}

            {/* Pagination Controls Bar */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 p-1.5 sm:p-2 rounded-full bg-surface-container/80 border border-outline-variant/40 shadow-sm backdrop-blur-md max-w-full overflow-x-auto no-scrollbar">
                {/* First Page Button (Desktop & Tablet) */}
                <button
                    type="button"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    aria-label="Go to first page"
                    title="First page"
                    className="hidden sm:flex h-9 w-9 md:h-10 md:w-10 rounded-full border border-outline-variant/60 items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">first_page</span>
                </button>

                {/* Previous Page Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    title="Previous page"
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>

                {/* Numbered Page Buttons & Ellipsis */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    {paginationRange.map((pageItem, index) => {
                        if (pageItem === "...") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="h-8 w-5 sm:h-9 sm:w-7 md:h-10 md:w-8 flex items-center justify-center text-on-surface-variant/60 font-body font-bold text-xs select-none"
                                >
                                    …
                                </span>
                            );
                        }

                        const pageNumber = Number(pageItem);
                        const isActive = pageNumber === currentPage;

                        return (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => onPageChange(pageNumber)}
                                aria-current={isActive ? "page" : undefined}
                                aria-label={`Page ${pageNumber}`}
                                className={`h-8 min-w-[32px] px-2 sm:h-9 sm:min-w-[36px] md:h-10 md:min-w-[40px] rounded-full font-body text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center cursor-pointer ${
                                    isActive
                                        ? "bg-primary text-on-primary shadow-md scale-105"
                                        : "text-on-surface hover:bg-surface-container-high hover:text-primary"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>

                {/* Next Page Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    title="Next page"
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>

                {/* Last Page Button (Desktop & Tablet) */}
                <button
                    type="button"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to last page"
                    title="Last page"
                    className="hidden sm:flex h-9 w-9 md:h-10 md:w-10 rounded-full border border-outline-variant/60 items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">last_page</span>
                </button>
            </div>
        </nav>
    );
}