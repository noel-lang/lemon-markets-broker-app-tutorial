import { ScrollView, View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import useSearch from "../hooks/useSearch";

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
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Suche nach Aktien, ETFs, Anleihen..."
                onChangeText={text => {
                    onChange(text);
                }}
            />
            <FlatList style={styles.list} data={searchResults} renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} key={item.isin} onPress={() => navigation.navigate("Detail", { isin: item.isin })}>
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.isin}</Text>
                        <Text>{mapItemType(item.type)}</Text>
                        <Text>{item.venues.map(venue => <Text>{venue.name}</Text>)}</Text>
                    </View>
                </TouchableOpacity>
            )} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    searchInput: {
        backgroundColor: "#cbd5e1",
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