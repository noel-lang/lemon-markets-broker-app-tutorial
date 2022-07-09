import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from "react-native";
import useFormattedNumbers from "../hooks/useFormattedNumbers";
import useLemonMarkets from "../hooks/useLemonMarkets";

export default function PortfolioScreen({ navigation }) {
    const [account, setAccount] = useState(null);
    const [positions, setPositions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const { getAccountData, getPositionData, getOrderData } = useLemonMarkets();
    const { getFormattedAmountWithDivision, getChangeInPercentage } = useFormattedNumbers();

    useEffect(() => {
        loadData();
    }, []);

    const getTotalInvestedAmount = () => {
        return positions.reduce((acc, position) => {
            return acc + position.estimated_price_total;
        }, 0);
    };

    const loadData = async () => {
        setRefreshing(true);

        const accountData = await getAccountData();
        setAccount(accountData);

        const positionsData = await getPositionData();
        setPositions(positionsData);

        const orderData = await getOrderData();
        setOrders(orderData);

        setRefreshing(false);
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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} tintColor="white" />}>
                {!!account && !!(positions.length > 0) && (
                    <View>
                        <Text style={styles.title}>
                            {getFormattedAmountWithDivision(getTotalInvestedAmount())}
                        </Text>
                        <Text style={{ marginTop: 5, color: "#cbd5e1" }}>
                            Hallo {account.firstname}, dir bleiben heute {getFormattedAmountWithDivision(account.cash_to_invest)} für geistreiche Investionen! 💎🤲
                        </Text>
                    </View>
                )}

                <View style={styles.positions}>
                    <Text style={styles.title}>Positionen</Text>
                    {positions.map(position => {
                        const changeInPercentage = getChangeInPercentage(position.estimated_price, position.buy_price_avg);
                        const itemStyles = getStylesForPerformance(changeInPercentage);

                        return  (
                            <TouchableOpacity key={position.isin} onPress={() => navigation.navigate("Detail", { isin: position.isin, position })}>
                                <View style={styles.item}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "white" }}>{position.isin_title}</Text>
                                    <Text style={{ color: "white" }}>{position.quantity}x {getFormattedAmountWithDivision(position.estimated_price)}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                    <View style={{}}>
                                        <Text style={{ color: itemStyles.text, fontWeight: "bold", fontSize: 16 }}>{changeInPercentage.toFixed(2)} %</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <View style={styles.positions}>
                    <Text style={styles.title}>Orderbuch</Text>
                    {orders.filter(order => order.status === "inactive").map(order => {
                        return (
                            <View key={order.id} style={{ paddingTop: 10, paddingBottom: 10 }}>
                                <Text style={{ color: "white" }}>{order.isin}</Text>
                                <Text style={{ color: "white" }}>{order.quantity}x {getFormattedAmountWithDivision(order.estimated_price)}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "black"
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
  