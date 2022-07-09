import { ScrollView, View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import useSearch from "../hooks/useSearch";
import theme from "../config/theme";

export default function SearchScreen({ navigation }) {
    const [onChange, searchResults] = useSearch();

    const mapItemType = (type) => {
        const types = {
            "stock": "Aktie",
            "bond": "Anleihe",
            "etf": "ETF",
            "fund": "Fonds"
        };

        return types[type] ?? type;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Suche nach Aktien, ETFs, Anleihen..."
                    placeholderTextColor="#94a3b8"
                    onChangeText={text => {
                        onChange(text);
                    }}
                />
                <FlatList style={styles.list} data={searchResults} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} key={item.isin} onPress={() => navigation.navigate("Detail", { isin: item.isin })}>
                        <View>
                            <Text style={{ color: "white" }}>{item.title}</Text>
                            <Text style={{ color: "white" }}>{item.isin}</Text>
                            <Text style={{ color: "white" }}>{mapItemType(item.type)}</Text>
                            <Text style={{ color: "white" }}>{item.venues.map(venue => <Text key={venue.name}>{venue.name}</Text>)}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: theme.BACKGROUND
    },
    searchInput: {
        backgroundColor: "#334155",
        color: theme.TEXT,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5
    },
    list: {
        marginTop: 20,
    },
    item: {
        marginBottom: 10
    }
})