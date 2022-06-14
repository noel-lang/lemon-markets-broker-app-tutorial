import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart, XAxis } from 'react-native-svg-charts';
import useFormattedNumbers from "../hooks/useFormattedNumbers";
import useLemonMarkets from "../hooks/useLemonMarkets";

export default function DetailScreen({ route, navigation }) {
    const { isin, position } = route.params;
    const { getPriceData, getInstrumentData, getQuoteData, placeOrder } = useLemonMarkets();

    const [priceData, setPriceData] = useState([]);
    const [instrument, setInstrument] = useState(undefined);
    const [quotesData, setQuotesData] = useState([]);

    const [processing, setProcessing] = useState(false);

    useEffect(async () => {
        const prices = await getPriceData(isin);
        setPriceData(prices);

        const instruments = await getInstrumentData(isin);
        setInstrument(instruments[0]);

        const quotes = await getQuoteData(isin);
        setQuotesData(quotes);
    }, []);

    const { getFormattedAmount, getChangeInPercentage, getFormattedAmountWithDivision } = useFormattedNumbers();

    const buy = async () => {
        setProcessing(true);
        const response = await placeOrder(isin, 5, "allday");
        setProcessing(false);

        console.log(response);
    };

    if (position === undefined || instrument === undefined || priceData === undefined || quotesData === undefined) {
        return null;
    }

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

            <View style={styles.box}>
                <Text style={styles.subTitle}>Gesamt</Text>
                <Text>{getFormattedAmountWithDivision(position.estimated_price_total)}</Text>
            </View>
            
            <View style={styles.box}>
                <Text style={styles.subTitle}>Anzahl</Text>
                <Text>{position.quantity}</Text>
            </View>
            
            <View style={styles.box}>
                <Text style={styles.subTitle}>Performance</Text>
                <Text>{getChangeInPercentage(position.buy_price_avg, position.estimated_price).toFixed(2)}%</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.subTitle}>Buy In</Text>
                <Text>{getFormattedAmountWithDivision(position.buy_price_avg)}</Text>
            </View>

            <TouchableOpacity onPress={buy} disabled={processing}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{processing ? "Kaufe..." : "Kaufen"}</Text>
                </View>
            </TouchableOpacity>
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
    subTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    box: {
        paddingTop: 5,
        paddingBottom: 5
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