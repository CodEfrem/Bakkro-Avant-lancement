// SearchNavigator.jsx
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchFilterScreen from '../screens/search/SearchFilter';
import SearchResultsScreen from '../screens/search/SearchResultsScreen';
import SearchScreen from '../screens/search/Search';
import PropertyDetails from '../screens/search/PropertyDetails';
import MapResultScreen from '../screens/search/MapResultScreen';
import { BottomNavigator } from './Navigators'; 
import { SessionProvider } from '../utils/SessionContext';
import SessionContext from '../utils/SessionContext';
import VisitProposalPage from '../screens/property/Viste';
import VideoPage from '../screens/property/VideoPage';
import SubscriptionPage from '../screens/property/SubscriptionPage';
import OneTimePaymentPage from '../screens/property/OneTimePaymentPage';
import AgentProfileScreen from '../screens/search/agence/AgentProfile';

const Stack = createStackNavigator();

const SearchNavigator = () => {
  const { session } = useContext(SessionContext);
  return (
    <SessionProvider>
      <Stack.Navigator initialRouteName="SearchFilterScreen">
        <Stack.Screen
          name="SearchFilterScreen"
          children={() => <SearchFilterScreen session={session} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="propertiesDetail"
          component={PropertyDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Visit"
          children={() => <VisitProposalPage session={session} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoPage"
          children={() => <VideoPage session={session} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubscriptionPage"
          children={() => <SubscriptionPage session={session} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OneTimePaymentPage"
          children={() => <OneTimePaymentPage session={session} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgentProfileScreen"
          component={AgentProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomNavigator} // Modification ici
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SessionProvider>
  );
};

export default SearchNavigator;
