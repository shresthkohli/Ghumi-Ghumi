import { useRef, useState, useEffect } from "react";
import destinationApi from "../api/destinationApi";
import favoritesApi from "../api/favoritesApi";

function Itineraries() {

    const [favorite, setFavorite] = useState([]);
    const [visited, setVisited] = useState([]);

    useEffect(() => {
        async function getData() {

            const res1 = await favoritesApi.getAllFavDestinations();
            setFavorite(res1);

        }
        getData();
    }, [])

    return(

        <>
            <ul>
            {
                favorite.map((des) => (
                <li key={des.id}>{des.name}</li>
                ))
            }
            </ul>
        </>
    )
}

export default Itineraries;