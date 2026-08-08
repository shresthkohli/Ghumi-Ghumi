import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import destinationsApi from "../api/destinationApi.js";

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
                const results = await destinationsApi.getDestinationsByQuery(
                    `search=${encodeURIComponent(trimmed)}`
                );
                if (results && results.length > 0) {
                    setSuggestions(results.slice(0, 5)); // max 5 suggestions
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch {
                setSuggestions([]);
                setShowSuggestions(false);
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
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;

        setShowSuggestions(false);
        setSuggestions([]);
        setSearchError("");
        setIsSearching(true);

        try {
            const results = await destinationsApi.getDestinationsByQuery(
                `search=${encodeURIComponent(query)}`
            );
            if (results && results.length > 0) {
                setSearchQuery("");
                navigate(`/destinations/${results[0].id}`);
            } else {
                setSearchError(`No destination found for "${query}"`);
                clearTimeout(errorTimerRef.current);
                errorTimerRef.current = setTimeout(() => setSearchError(""), 4000);
            }
        } catch {
            setSearchError("Something went wrong. Please try again.");
            clearTimeout(errorTimerRef.current);
            errorTimerRef.current = setTimeout(() => setSearchError(""), 4000);
        } finally {
            setIsSearching(false);
        }
    }, [searchQuery, navigate]);

    // Dismiss suggestions
    const dismissSuggestions = useCallback(() => {
        // Small delay so click on suggestion registers first
        setTimeout(() => setShowSuggestions(false), 150);
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
