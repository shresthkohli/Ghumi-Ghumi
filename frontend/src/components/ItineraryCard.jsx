import destinationApi from "../api/destinationApi";

function ItineraryCard({ itinerary, onDelete }) {
    
    const destination = await destinationApi.getDestinationById(itinerary.destinationId); 

    const destinationImage = destination?.image_url;
    const destinationName = destination?.name;

    return (
        <div className="glass-widget p-6 rounded-3xl group cursor-pointer hover:shadow-xl transition-all">
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface-container-high">
            {destinationImage && (
            <img
                src={destinationImage}
                alt={destinationName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            )}
            {destinationName && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-label-md text-primary">
                {destinationName}
            </div>
            )}
        </div>

        <div className="flex justify-between items-start gap-3">
            <div>
            <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                {itinerary.title}
            </h4>
            {itinerary.description && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {itinerary.description}
                </p>
            )}
            </div>
            <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete(itinerary.id);
            }}
            className="material-symbols-outlined text-outline hover:text-primary transition-colors"
            >
            delete
            </button>
        </div>
        </div>
    );
}

export default ItineraryCard;