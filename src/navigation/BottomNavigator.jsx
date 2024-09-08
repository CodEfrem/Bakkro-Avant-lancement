// BottomNavigator.jsx
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import { SearchNavigator, AcountNavigator } from './Navigators'; // Modification ici
import FavoritesListScreen from '../screens/favorites/FavoritesScreen';
import SessionContext from '../utils/SessionContext';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const { session } = useContext(SessionContext);

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen session={session} />}
        options={{
          title: 'Acceuil',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/HomeActive.png')
                  : require('../assets/images/Home.png')
              }
            />
          ),
          tabBarActiveTintColor: '#E97400',
          tabBarInactiveTintColor: '#3A3A47',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator} // Modification ici
        options={{
          title: 'Recherche',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/SearchActive.png')
                  : require('../assets/images/Search.png')
              }
            />
          ),
          tabBarActiveTintColor: '#E97400',
          tabBarInactiveTintColor: '#3A3A47',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorites"
        children={() => <FavoritesListScreen session={session} />}
        options={{
          title: 'Favoris',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/FavoriteActive.png')
                  : require('../assets/images/Favorite.png')
              }
            />
          ),
          tabBarActiveTintColor: '#E97400',
          tabBarInactiveTintColor: '#3A3A47',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        children={() => <AcountNavigator />} // Modification ici
        options={{
          title: 'Mon profil',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/UserActive.png')
                  : require('../assets/images/User.png')
              }
            />
          ),
          headerShown: false,
          tabBarActiveTintColor: '#E97400',
          tabBarInactiveTintColor: '#3A3A47',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
