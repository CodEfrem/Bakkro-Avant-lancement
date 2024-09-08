import React, {useEffect, useState} from 'react';
import {supabase} from './src/lib/supabase';
import HomeScreen from './src/screens/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from './src/screens/account/Account';
import AuthScreen from './src/screens/authentication/Auth';
import SearchScreen from './src/screens/search/Search';
import SignInScreen from './src/screens/authentication/SignIn';
import SearchFilterScreen from './src/screens/search/SearchFilter';
import BottomNavigator from './src/navigation/BottomNavigator';

const App = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const SearchStack = createStackNavigator();


  return (
    <NavigationContainer>
      {session ? (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            children={() => <HomeScreen session={session} />}
            options={{
              title: 'Acceuil',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/HomeActive.png')
                      : require('./src/assets/images/Home.png')
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
            component={SearchScreen}
            options={{
              title: 'Recherche',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/SearchActive.png')
                      : require('./src/assets/images/Search.png')
                  }
                />
              ),
              tabBarActiveTintColor: '#E97400', // Couleur du titre en focus
              tabBarInactiveTintColor: '#3A3A47', // Couleur du titre hors focus
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Account"
            // Passer session comme une propriété
            children={() => <AccountScreen session={session} />}
            options={{
              title: 'Mon compte',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/UserActive.png')
                      : require('./src/assets/images/User.png')
                  }
                />
              ),
              headerShown: false,
              tabBarActiveTintColor: '#E97400',
              tabBarInactiveTintColor: '#3A3A47',
            }}
          />
        </Tab.Navigator>
        
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
     <SearchStack.Screen
        name="SearchFilterScreen"
        component={SearchFilterScreen}
        options={{ headerShown: false }}
      />
    </NavigationContainer>
  );
};

export default App;
