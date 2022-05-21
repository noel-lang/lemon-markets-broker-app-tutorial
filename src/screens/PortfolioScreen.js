import { View, Text, StyleSheet } from "react-native";
import useAccount from "../hooks/useAccount";
import usePositions from "../hooks/usePositions";

export default function PortfolioScreen() {
    const [account, loading] = useAccount();
    const [positions] = usePositions();
    
    const getFormattedAmount = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value / 10000);
    };

    return (
        <View style={styles.container}>
            {!!account && (
                <View>
                    <Text>
                        Hallo {account.firstname}, dir bleiben heute {getFormattedAmount(account.cash_to_invest)} für geistreiche Investionen! 💎🤲
                    </Text>
                </View>
            )}

            <View style={styles.positions}>
                <Text style={styles.title}>Positionen</Text>
                {positions.map(position => (
                    <View style={styles.item} key={position.isin}>
                        <Text>{position.isin_title}</Text>
                    </View>
                ))}
            </View>
        </View>
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
        paddingTop: 5,
        paddingBottom: 5
    }
});
  