import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

import L from "leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";


function createMarker(icon, size = "normal") {

    const markerSize =
        size === "large" ? 44 : 34;

    const fontSize =
        size === "large" ? 24 : 18;

    return L.divIcon({

        className: "",

        html: `
            <div
                style="
                    width: ${markerSize}px;
                    height: ${markerSize}px;
                    border-radius: 50%;
                    background: #12372A;
                    border: 2px solid #D4AF37;
                    box-shadow:
                        0 0 12px rgba(212,175,55,0.7),
                        0 4px 12px rgba(0,0,0,0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                <span
                    class="material-symbols-outlined"
                    style="
                        font-size: ${fontSize}px;
                        color: #D4AF37;
                        line-height: 1;
                    "
                >
                    ${icon}
                </span>
            </div>
        `,

        iconSize: [markerSize, markerSize],

        iconAnchor: [
            markerSize / 2,
            markerSize / 2
        ],

        popupAnchor: [
            0,
            -(markerSize / 2)
        ]

    });

}


function MapBounds({ destination, attractions }) {

    const map = useMap();

    useEffect(() => {

        if (
            destination?.latitude == null ||
            destination?.longitude == null
        ) {
            return;
        }

        const coordinates = [

            [
                Number(destination.latitude),
                Number(destination.longitude)
            ],

            ...attractions
                .filter(
                    attraction =>
                        attraction.latitude != null &&
                        attraction.longitude != null
                )
                .map(
                    attraction => [
                        Number(attraction.latitude),
                        Number(attraction.longitude)
                    ]
                )

        ];

        if (coordinates.length === 1) {

            map.setView(
                coordinates[0],
                13
            );

            return;

        }

        const bounds =
            L.latLngBounds(coordinates);

        map.fitBounds(
            bounds,
            {
                padding: [50, 50],
                maxZoom: 13
            }
        );

    }, [
        map,
        destination,
        attractions
    ]);

    return null;

}


export default function DestinationMap({
    destination,
    attractions = []
}) {

    if (
        !destination?.latitude ||
        !destination?.longitude
    ) {
        return null;
    }

    const destinationMarker =
        createMarker(
            destination.icon || "location_on",
            "large"
        );

    const attractionMarkers =
        new Map();

    attractions.forEach(
        attraction => {

            attractionMarkers.set(
                attraction.id,
                createMarker(
                    attraction.icon || "location_on"
                )
            );

        }
    );

    return (

        <div
            className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                shadow-warm-lg
            "
        >

            <MapContainer
                center={[
                    Number(destination.latitude),
                    Number(destination.longitude)
                ]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-[500px] w-full"
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapBounds
                    destination={destination}
                    attractions={attractions}
                />

                {/* DESTINATION */}

                <Marker
                    position={[
                        Number(destination.latitude),
                        Number(destination.longitude)
                    ]}
                    icon={destinationMarker}
                >

                    <Popup>

                        <div className="min-w-[180px]">

                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Destination
                            </p>

                            <h3 className="mt-1 text-lg font-semibold">
                                {destination.name}
                            </h3>

                        </div>

                    </Popup>

                </Marker>


                {/* ATTRACTIONS */}

                {
                    attractions
                        .filter(
                            attraction =>
                                attraction.latitude != null &&
                                attraction.longitude != null
                        )
                        .map(attraction => (

                            <Marker
                                key={attraction.id}
                                position={[
                                    Number(attraction.latitude),
                                    Number(attraction.longitude)
                                ]}
                                icon={
                                    attractionMarkers.get(
                                        attraction.id
                                    )
                                }
                            >

                                <Popup>

                                    <div className="min-w-[200px]">

                                        <div className="flex items-center gap-2">

                                            <span className="material-symbols-outlined text-lg">
                                                {attraction.icon}
                                            </span>

                                            <h3 className="font-semibold">
                                                {attraction.name}
                                            </h3>

                                        </div>

                                        <p className="mt-2 text-sm text-gray-600">
                                            {attraction.description}
                                        </p>

                                    </div>

                                </Popup>

                            </Marker>

                        ))
                }

            </MapContainer>

        </div>

    );

}