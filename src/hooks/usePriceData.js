import { useState, useEffect } from "react";
import config from "../config/config";

export default function usePriceData(isin) {
    const [loading, setLoading] = useState(null);
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetch(`${config.MARKET_API_URL}/ohlc/d1/?isin=${isin}&from=2022-05-01`, {
            headers: {
                "Authorization": `Bearer ${config.API_KEY}`
            }
        })
        .then(response => response.json())
        .then(priceData => {
            setPriceData(priceData.results);
        })
        .finally(() => setLoading(false))
    }, []);

    return [ priceData, loading ];
}