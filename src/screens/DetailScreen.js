import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LineChart } from 'react-native-svg-charts';
import useInstrument from "../hooks/useInstrument";
import usePriceData from "../hooks/usePriceData";

export default function DetailScreen({ route, navigation }) {
    const { isin } = route.params;
    const [priceData] = usePriceData(isin);
    const [instrument] = useInstrument(isin);

    if (instrument === undefined || priceData === undefined) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{instrument.name}</Text>
            <Text>{instrument.symbol} - {isin}</Text>
            <LineChart
                style={{ height: 200 }}
                data={priceData.map(item => item.c)}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            />
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
    }
});