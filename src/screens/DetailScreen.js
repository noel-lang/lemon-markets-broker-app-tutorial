import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LineChart, XAxis } from 'react-native-svg-charts';
import useFormattedNumbers from "../hooks/useFormattedNumbers";
import useLemonMarkets from "../hooks/useLemonMarkets";

export default function DetailScreen({ route, navigation }) {
    const { isin, position } = route.params;
    const { getPriceData, getInstrumentData, getQuoteData } = useLemonMarkets();

    const [priceData, setPriceData] = useState([]);
    const [instrument, setInstrument] = useState(undefined);
    const [quotesData, setQuotesData] = useState([]);

    useEffect(async () => {
        const prices = await getPriceData(isin);
        setPriceData(prices);

        const instruments = await getInstrumentData(isin);
        setInstrument(instruments);

        const quotes = await getQuoteData(isin);
        setQuotesData(quotes);
    }, []);

    const { getFormattedAmount, getChangeInPercentage, getFormattedAmountWithDivision } = useFormattedNumbers();

    if (instrument === undefined || priceData === undefined || quotesData === undefined) {
        return null;
    }

    // const dateFormatter = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" });

    /* const xAxisData = priceData.map(item => {
        // return dayFormat.format(new Date(item.t));
        return new Date(item.t);
    }); */

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{instrument.name}</Text>
            <Text>Symbol: {instrument.symbol} - ISIN: {isin}</Text>
            <View style={{ height: 200, padding: 20 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={priceData.map(item => item.c)}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                />
            </View>
            {position !== undefined && (
                <View>
                    <Text>Durchschn. Einkaufspreis: {getFormattedAmountWithDivision(position.buy_price_avg)}</Text>
                    <Text>Aktueller Preis: {getFormattedAmountWithDivision(position.estimated_price)}</Text>
                    <Text>Performance: {getFormattedAmountWithDivision(position.buy_price_avg - position.estimated_price)} ({getChangeInPercentage(position.buy_price_avg, position.estimated_price).toFixed(2)}%)</Text>
                </View>
            )}
            {!!quotesData && quotesData[0] !== undefined && (
                <View>
                    <Text>Angebotspreis: {getFormattedAmount(quotesData[0].b)}</Text>
                    <Text>Verkaufspreis: {getFormattedAmount(quotesData[0].a)}</Text>
                    <Text>Börse: {quotesData[0].mic}</Text>
                </View>
            )}
            <View style={styles.button}>
                <Text style={styles.buttonText}>Kaufen</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 24
    },
    positions: {
        marginTop: 20
    },
    item: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        backgroundColor: "#1e293b",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        flex: 1,
        alignSelf: "center"
    }
});