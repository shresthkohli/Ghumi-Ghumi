import { useEffect, useState } from "react";
import { getFeaturedId, getDestinations } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import { FaUnsplash } from "react-icons/fa6";

const RESULTS_PER_PAGE = 7;

function Destinations() {

    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategories, setActiveCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const data = getDestinations();
        setDestinations(data);
        setIsLoading(false);
    }, []);

    // when category button is pressed
    function handleCategoryToggle(categoryId) {
        setCurrentPage(1);
        setActiveCategories((prev) =>
          prev.includes(categoryId)
            ?  prev.filter((id) => id != categoryId)
            :  [...prev, categoryId]
        )
    }
    
    const filteredDestinations =
        activeCategories.length === 0
            ?   destinations
            :   destinations.filter((d) => activeCategories.includes(d.category))


    const totalPages = Math.ceil(filteredDestinations.length / RESULTS_PER_PAGE);
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    
    const visibleDestinations = filteredDestinations.slice(
        startIndex,
        startIndex + RESULTS_PER_PAGE
    );

    const featuredId = getFeaturedId(destinations);

    const featuredDestination = 
        currentPage === 1
            ?   visibleDestinations.find((d) => d.id === featuredId)
            :   undefined;

    const regularDestinations = visibleDestinations.filter(
        (d) => d.id !== featuredDestination?.id
    );

    return (

        <div className="bg-surface min-h-screen">
            {/* Hero header */}
            <header className="relative bg-[#0b2b26] pt-12 pb-24 px-margin-desktop">
                <div className="max-w-container-max mx-auto">
                    <nav className="flex items-center gap-2 text-primary-fixed opacity-70 mb-8 font-body text-label-md">
                        <span>Destinations</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span className="text-on-primary">Places to Visit in India</span>
                    </nav>
                    <h1 className="font-display text-display-lg text-on-primary mb-4">
                        Best Places to Visit in India
                    </h1>
                    <p className="text-primary-fixed max-w-2xl font-body text-body-lg leading-relaxed">
                        From the Pink City's palaces to the tiger trails of Jim Corbett, 
                        discover the destinations worth building your next trip around.
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-container-max mx-auto px-margin-desktop -mt-12 mb-section-gap flex flex-col md:flex-row gap-gutter">
                <FilterSidebar
                    activeCategories={activeCategories}
                    onCatefotyToggle={handleCategoryToggle}
                />

                <section className="grow">
                    <div className="flex justify-between items-center mb-8">
                        <span className="font-body text-body-md text-primary-container z-10">
                            <span className="font-bold text-on-primary">
                                {filteredDestinations.length}
                            </span>{" "}
                            results found
                        </span>
                    </div>

                    {isLoading && (
                        <p className="text-on-surface-variant">Loading destinations...</p>
                    )}

                    {!isLoading && filteredDestinations.length === 0 && (
                        <p className="text-on-surface-variant">No destinations match...</p>
                    )}

                    {!isLoading && filteredDestinations.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
                            {featuredDestination && (
                                <DestinationCard destination={featuredDestination} featured />
                            )}

                            {regularDestinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    destination={destination}
                                />
                            ))}
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </section>
            </main>
        </div>
    );
}

export default Destinations;