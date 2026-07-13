// Simple pagination row. Only shows page numbers directly (no "..." collapsing)

export default function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (

        <div className="mt-16 flex justify-center items-center gap-4">
            
        <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
        >
            <span className="material-symbols-outlined">chevron_left</span>
        </button>

        <div className="flex gap-2">
            {pages.map((page) => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-12 h-12 rounded-full font-bold transition-all ${
                page === currentPage
                    ? "bg-primary text-on-primary"
                    : "hover:bg-surface-container-high"
                }`}
            >
                {page}
            </button>
            ))}
        </div>

        <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
        >
            <span className="material-symbols-outlined">chevron_right</span>
        </button>
        </div>
    );
}