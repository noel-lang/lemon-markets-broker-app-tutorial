import { format, addDays, subDays } from "date-fns";
import config from "../config/config";

export default function useLemonMarkets() {

    const getAccountData = async () => {
        return request("/account");
    };

    const getPositionData = async () => {
        return request("/positions");
    };

    const getOrderData = async () => {
        return request("/orders");
    };

    const getPriceData = async (isin) => {
        return request(`/ohlc/d1/?isin=${isin}&from=${format(subDays(new Date(), 30), "yyyy-MM-dd")}`, { baseUrl: config.MARKET_API_URL });
    };

    const getQuoteData = async (isin) => {
        return request(`/quotes/latest/?isin=${isin}`, { baseUrl: config.MARKET_API_URL });
    };

    const getInstrumentData = async (isin) => {
        return request(`/instruments/?isin=${isin}`, { baseUrl: config.MARKET_API_URL })
    };

    const placeOrder = async (isin, quantity, venue) => {
        const twoWeeksFromNowFormatted = format(addDays(new Date(), 14), "yyyy-MM-dd");

        return request(`/orders`, {
            method: "POST",
            body: JSON.stringify({
                isin,
                quantity,
                venue,
                "expires_at": twoWeeksFromNowFormatted,
                "side": "buy",
            })
        });
    };

    const request = async (path, settings) => {
        const fetchConfiguration = Object.assign({
            baseUrl: config.BASE_URL,
            method: "GET",
        }, settings);

        return new Promise((resolve, reject) => {
            fetch(`${fetchConfiguration.baseUrl}${path}`, {
                method: fetchConfiguration.method,
                body: fetchConfiguration?.body ?? undefined,
                headers: {
                    "Authorization": `Bearer ${config.API_KEY}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => resolve(data.results))
            .catch(err => reject(err))
        });
    };

    return { getAccountData, getPositionData, getPriceData, getQuoteData, getOrderData, getInstrumentData, placeOrder };
}