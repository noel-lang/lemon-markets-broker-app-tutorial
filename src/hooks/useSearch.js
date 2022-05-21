import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import config from "../config/config";

export default function useSearch() {
    const [loading, setLoading] = useState(null);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const onChange = useCallback(debounce(
        (value) => {
            search(value);
        },
        500
    ), [query]);

    const search = (value) => {
        setLoading(true);

        fetch(`https://data.lemon.markets/v1/instruments/?search=${value}`, {
            headers: {
                "Authorization": `Bearer ${config.API_KEY}`
            }
        })
        .then(response => response.json())
        .then(searchResults => {
            setSearchResults(searchResults.results);
        })
        .finally(() => setLoading(false))
    };

    return [ debouncedQuery, query, setQuery, onChange, searchResults, loading ];
}