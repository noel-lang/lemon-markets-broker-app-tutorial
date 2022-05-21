import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import useAccount from "../hooks/useAccount";
import usePositions from "../hooks/usePositions";

export default function PortfolioScreen({ navigation }) {
    const [account, loading] = useAccount();
    const [positions] = usePositions();
    
    const getFormattedAmount = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value / 10000);
    };

    const getTotalInvestedAmount = () => {
        return positions.reduce((acc, position) => {
            return acc + position.estimated_price_total;
        }, 0);
    };

    const getChangeInPercentage = (oldNumber, newNumber) => {
        let difference = oldNumber - newNumber;
    
        return (difference / oldNumber) * 100;
    }

    return (
        <ScrollView style={styles.container}>
            {!!account && !!(positions.length > 0) && (
                <View>
                    <Text style={styles.title}>
                        {getFormattedAmount(getTotalInvestedAmount())}
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                        Hallo {account.firstname}, dir bleiben heute {getFormattedAmount(account.cash_to_invest)} für geistreiche Investionen! 💎🤲
                    </Text>
                </View>
            )}

            <View style={styles.positions}>
                <Text style={styles.title}>Positionen</Text>
                {positions.map(position => (
                    <TouchableOpacity key={position.isin} onPress={() => navigation.navigate("Detail")}>
                        <View style={styles.item}>
                        <View style={{ flex: 1 }}>
                            <Text>{position.isin_title}</Text>
                            <Text>{position.quantity}x {getFormattedAmount(position.estimated_price)}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                            <Text>{getChangeInPercentage(position.buy_price_avg, position.estimated_price).toFixed(2)} %</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                ))}
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
    }
});
  