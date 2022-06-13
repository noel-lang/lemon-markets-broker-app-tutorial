import config from "../config/config";

export default function useLemonMarkets() {

    const getAccountData = async () => {
        return request("/account");
    };

    const getPositionData = async () => {
        return request("/positions");
    };

    const getPriceData = async (isin) => {
        return request(`/ohlc/d1/?isin=${isin}&from=2022-05-01`, config.MARKET_API_URL);
    };

    const getQuoteData = async (isin) => {
        return request(`/quotes/latest/?isin=${isin}`, config.MARKET_API_URL);
    };

    const getInstrumentData = async (isin) => {
        return request(`/instruments/?isin=${isin}`, config.MARKET_API_URL)
    };

    const request = async (path, baseUrl = config.BASE_URL) => {
        return new Promise((resolve, reject) => {
            fetch(`${baseUrl}${path}`, {
                headers: {
                    "Authorization": `Bearer ${config.API_KEY}`
                }
            })
            .then(response => response.json())
            .then(data => resolve(data.results))
            .catch(err => reject(err))
        });
    };

    return { getAccountData, getPositionData, getPriceData, getQuoteData, getInstrumentData };
}