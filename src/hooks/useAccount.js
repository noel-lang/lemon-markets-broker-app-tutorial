import { useState, useEffect } from "react";
import config from "../config/config";

export default function useAccount() {
    const [loading, setLoading] = useState(null);
    const [account, setAccount] = useState();

    useEffect(() => {
        setLoading(true);

        fetch(`${config.BASE_URL}/account/`, {
            headers: {
                "Authorization": `Bearer ${config.API_KEY}`
            }
        })
        .then(response => response.json())
        .then(account => {
            console.log(account);
            setAccount(account.results);
        })
        .finally(() => setLoading(false))
    }, []);

    return [ account, loading ];
}