import { useState, useEffect } from "react";
import config from "../config/config";

export default function usePositions() {
    const [loading, setLoading] = useState(null);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetch(`${config.BASE_URL}/positions/`, {
            headers: {
                "Authorization": `Bearer ${config.API_KEY}`
            }
        })
        .then(response => response.json())
        .then(positions => {
            setPositions(positions.results);
        })
        .finally(() => setLoading(false))
    }, []);

    return [ positions, loading ];
}