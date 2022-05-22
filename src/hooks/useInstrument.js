import { useState, useEffect } from "react";
import config from "../config/config";

export default function useInstrument(isin) {
    const [loading, setLoading] = useState(null);
    const [instrument, setInstrument] = useState({});

    useEffect(() => {
        setLoading(true);

        fetch(`${config.MARKET_API_URL}/instruments/?isin=${isin}`, {
            headers: {
                "Authorization": `Bearer ${config.API_KEY}`
            }
        })
        .then(response => response.json())
        .then(instruments => {
            console.log(instruments);
            setInstrument(instruments.results[0]);
        })
        .finally(() => setLoading(false))
    }, []);

    return [ instrument, loading ];
}