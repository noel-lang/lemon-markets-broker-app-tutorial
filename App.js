import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import PortfolioScreen from './src/screens/PortfolioScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailScreen from './src/screens/DetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

const themeSettings = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={themeSettings}>
      <TabNavigator />
    </NavigationContainer>
  );
}

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#059669",
      tabBarInactiveTintColor: "white",
      tabBarIconStyle: { color: "white" },
      tabBarStyle: { backgroundColor: "black", borderTopWidth: 5, borderTopColor: "#059669" },
    }}
  >
    <Tab.Screen
      name="Portfolio"
      component={HomeStackScreen}
      options={{ tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={24} color={color} /> }}
      />
    <Tab.Screen
      name="Suche"
      component={SearchStackScreen}
      options={{ tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} /> }}
    />
  </Tab.Navigator>
);

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: "#0f172a",
    borderBottomWidth: 5,
    borderBottomColor : "#059669"
  },
  headerTintColor: "white",
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={defaultScreenOptions}>
      <HomeStack.Screen name="Mein Portfolio" component={PortfolioScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator screenOptions={defaultScreenOptions}>
      <SearchStack.Screen name="Suche" component={SearchScreen} />
      <SearchStack.Screen name="Detail" component={DetailScreen} />
    </SearchStack.Navigator>
  );
};