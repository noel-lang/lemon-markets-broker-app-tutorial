import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LineChart } from 'react-native-svg-charts';
import useFormattedNumbers from "../hooks/useFormattedNumbers";
import useInstrument from "../hooks/useInstrument";
import usePriceData from "../hooks/usePriceData";

export default function DetailScreen({ route, navigation }) {
    const { isin, position } = route.params;
    const [priceData] = usePriceData(isin);
    const [instrument] = useInstrument(isin);
    const [getFormattedAmount, getChangeInPercentage] = useFormattedNumbers();

    if (instrument === undefined || priceData === undefined) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{instrument.name}</Text>
            <Text>Symbol: {instrument.symbol} - ISIN: {isin}</Text>
            <LineChart
                style={{ height: 200 }}
                data={priceData.map(item => item.c)}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            />
            {position !== undefined && (
                <View>
                    <Text>Durchschn. Einkaufspreis: {getFormattedAmount(position.buy_price_avg)}</Text>
                    <Text>Aktueller Preis: {getFormattedAmount(position.estimated_price)}</Text>
                    <Text>Performance: {getFormattedAmount(position.buy_price_avg - position.estimated_price)} ({getChangeInPercentage(position.buy_price_avg, position.estimated_price).toFixed(2)}%)</Text>
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