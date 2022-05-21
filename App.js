import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import PortfolioScreen from './src/screens/PortfolioScreen';
import SearchScreen from './src/screens/SearchScreen';
import useAccount from './src/hooks/useAccount';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
