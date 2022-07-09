import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import useFormattedNumbers from "../hooks/useFormattedNumbers";
import useLemonMarkets from "../hooks/useLemonMarkets";

export default function PortfolioScreen({ navigation }) {
    const [account, setAccount] = useState(null);
    const [positions, setPositions] = useState([]);

    const { getAccountData, getPositionData } = useLemonMarkets();
    const { getFormattedAmountWithDivision, getChangeInPercentage } = useFormattedNumbers();

    useEffect(async () => {
        const accountData = await getAccountData();
        setAccount(accountData);

        const positionsData = await getPositionData();
        setPositions(positionsData);
    }, []);

    const getTotalInvestedAmount = () => {
        return positions.reduce((acc, position) => {
            return acc + position.estimated_price_total;
        }, 0);
    };

    const getStylesForPerformance = (value) => {
        if (value > 0) {
            return { text: "#10b981", background: "#047857" };
        } else if (value < 0) {
            return { text: "#dc2626", background: "#991b1b" };
        } else {
            return { text: "#64748b", background: "#334155" };
        }
    }

    return (
        <ScrollView style={styles.container}>
            {!!account && !!(positions.length > 0) && (
                <View>
                    <Text style={styles.title}>
                        {getFormattedAmountWithDivision(getTotalInvestedAmount())}
                    </Text>
                    <Text style={{ marginTop: 5, color: "white" }}>
                        Hallo {account.firstname}, dir bleiben heute {getFormattedAmountWithDivision(account.cash_to_invest)} für geistreiche Investionen! 💎🤲
                    </Text>
                </View>
            )}

            <View style={styles.positions}>
                <Text style={styles.title}>Positionen</Text>
                {positions.map(position => {
                    const changeInPercentage = getChangeInPercentage(position.buy_price_avg, position.estimated_price);
                    const itemStyles = getStylesForPerformance(changeInPercentage);

                    return  (
                        <TouchableOpacity key={position.isin} onPress={() => navigation.navigate("Detail", { isin: position.isin, position })}>
                            <View style={styles.item}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "white" }}>{position.isin_title}</Text>
                                <Text style={{ color: "white" }}>{position.quantity}x {getFormattedAmountWithDivision(position.estimated_price)}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                <View style={{ backgroundColor: itemStyles.background, padding: 5, borderRadius: 5 }}>
                                    <Text style={{ color: itemStyles.text }}>{changeInPercentage.toFixed(2)} %</Text>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#0f172a"
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white"
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
  