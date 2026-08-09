import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import destinationsApi from "../api/destinationApi.js";
import { getDestinations } from "../data/destinations.js";

const DEBOUNCE_MS = 300;

export default function useDestinationSearch() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debounceRef = useRef(null);
    const errorTimerRef = useRef(null);

    // Debounced autocomplete as the user types
    useEffect(() => {
        const trimmed = searchQuery.trim();
        if (trimmed.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                let results = await destinationsApi.getDestinationsByQuery(
                    `search=${encodeURIComponent(trimmed)}`
                );
                if (!results || !Array.isArray(results) || results.length === 0) {
                    const local = getDestinations();
                    const filtered = local.filter((d) => {
                        const q = trimmed.toLowerCase();
                        return (
                            d.name?.toLowerCase().includes(q) ||
                            d.city?.toLowerCase().includes(q) ||
                            d.state?.toLowerCase().includes(q) ||
                            d.category?.toLowerCase().includes(q)
                        );
                    });
                    if (filtered.length > 0) {
                        results = filtered;
                    }
                }

                if (results && results.length > 0) {
                    setSuggestions(results.slice(0, 5)); // max 5 suggestions
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch {
                const local = getDestinations();
                const filtered = local.filter((d) => {
                    const q = trimmed.toLowerCase();
                    return (
                        d.name?.toLowerCase().includes(q) ||
                        d.city?.toLowerCase().includes(q) ||
                        d.state?.toLowerCase().includes(q) ||
                        d.category?.toLowerCase().includes(q)
                    );
                });
                if (filtered.length > 0) {
                    setSuggestions(filtered.slice(0, 5));
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(debounceRef.current);
    }, [searchQuery]);

    // Navigate to a specific suggestion
    const pickSuggestion = useCallback((dest) => {
        setSearchQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
        setSearchError("");
        navigate(`/destinations/${dest.id}`);
    }, [navigate]);

    // Submit search form
    const handleSearch = useCallback(async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return false;

        setShowSuggestions(false);
        setSuggestions([]);
        setSearchError("");
        setIsSearching(true);

        try {
            let results = await destinationsApi.getDestinationsByQuery(
                `search=${encodeURIComponent(query)}`
            );

            if (!results || !Array.isArray(results) || results.length === 0) {
                const local = getDestinations();
                const filtered = local.filter((d) => {
                    const q = query.toLowerCase();
                    return (
                        d.name?.toLowerCase().includes(q) ||
                        d.city?.toLowerCase().includes(q) ||
                        d.state?.toLowerCase().includes(q) ||
                        d.category?.toLowerCase().includes(q)
                    );
                });
                if (filtered.length > 0) {
                    results = filtered;
                }
            }

            if (results && results.length > 0) {
                setSearchQuery("");
                navigate(`/destinations/${results[0].id}`);
                return true;
            } else {
                setSearchError(`No destination found for "${query}"`);
                clearTimeout(errorTimerRef.current);
                errorTimerRef.current = setTimeout(() => setSearchError(""), 4000);
                return false;
            }
        } catch {
            const local = getDestinations();
            const filtered = local.filter((d) => {
                const q = query.toLowerCase();
                return (
                    d.name?.toLowerCase().includes(q) ||
                    d.city?.toLowerCase().includes(q) ||
                    d.state?.toLowerCase().includes(q) ||
                    d.category?.toLowerCase().includes(q)
                );
            });
            if (filtered.length > 0) {
                setSearchQuery("");
                navigate(`/destinations/${filtered[0].id}`);
                return true;
            }
            setSearchError("Something went wrong. Please try again.");
            clearTimeout(errorTimerRef.current);
            errorTimerRef.current = setTimeout(() => setSearchError(""), 4000);
            return false;
        } finally {
            setIsSearching(false);
        }
    }, [searchQuery, navigate]);

    // Dismiss suggestions
    const dismissSuggestions = useCallback(() => {
        // Small delay so click on suggestion registers first
        setTimeout(() => setShowSuggestions(false), 200);
    }, []);

    const resetSearch = useCallback(() => {
        setSearchQuery("");
        setSearchError("");
        setSuggestions([]);
        setShowSuggestions(false);
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        searchError,
        setSearchError,
        isSearching,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        handleSearch,
        pickSuggestion,
        dismissSuggestions,
        resetSearch,
    };
}

