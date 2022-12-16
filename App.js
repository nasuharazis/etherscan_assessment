import * as React from 'react';
import 'react-native-gesture-handler';
import {Provider} from "react-redux";
import store from "./src/store";
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
 
import Explorer from './src/screen/Explorer';
import Watchlist from './src/screen/Watchlist';
import Favourite from './src/screen/Favourite';
 
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
 
function ExplorerStack() {
  return (
      <Stack.Navigator
        initialRouteName="Explorer"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="Explorer"
          component={Explorer}
          options={{ title: 'Explorer' }}/>
      </Stack.Navigator>
  );
}
 
function WatchlistStack() {
  return (
    <Stack.Navigator
      initialRouteName="Explorer"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Watchlist"
        component={Watchlist}
        options={{ title: 'Watchlist Page' }}/>
    </Stack.Navigator>
  );
}
 
function FavouriteStack() {
  return (
    <Stack.Navigator
      initialRouteName="Explorer"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Favourite"
        component={Favourite}
        options={{ title: 'Favourite Page' }}/>
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          activeTintColor: '#004DDC',
        }}>
        
        <Tab.Screen
          name="HomeStack"
          component={ExplorerStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Explorer',
            tabBarActiveTintColor: '#004DDC',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="compass" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="WatchlistStack"
          component={WatchlistStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Watchlist',
            tabBarActiveTintColor: '#004DDC',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="list" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen
          name="FavouriteStack"
          component={FavouriteStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Favourite',
            tabBarActiveTintColor: '#004DDC',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="bookmark" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
export default App;