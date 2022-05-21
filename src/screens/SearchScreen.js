import { ScrollView, View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import useSearch from "../hooks/useSearch";

export default function SearchScreen() {
    const [debouncedQuery, query, setQuery, onChange, searchResults ] = useSearch();

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Suche nach Aktien, ETFs, Anleihen..."
                onChangeText={text => {
                    onChange(text);
                }}
            />
            <FlatList data={searchResults} renderItem={({ item }) => (
                <View key={item.isin}>
                    <Text>{item.title}</Text>
                    <Text>{item.isin}</Text>
                    <Text>{item.type}</Text>
                    <Text>{item.venues.map(venue => <Text>{venue.name}</Text>)}</Text>
                </View>
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
    }
})