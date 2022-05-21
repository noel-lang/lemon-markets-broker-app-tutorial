import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import PortfolioScreen from './src/screens/PortfolioScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailScreen from './src/screens/DetailScreen';
import useAccount from './src/hooks/useAccount';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Portfolio"
      component={PortfolioScreen}
      options={{ tabBarIcon: () => <Ionicons name="list-outline" size={24} /> }}
      />
    <Tab.Screen
      name="Suche"
      component={SearchScreen}
      options={{ tabBarIcon: () => <Ionicons name="search-outline" size={24} /> }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
