import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SessionContext from '../utils/SessionContext';
import AcountScreen from '../screens/account/AcountScreen';
import ProfileScreen from '../screens/account/ProfileScreen';
import SettingScreen from '../screens/account/SettingScreen';
import PrivacyPolicyScreen from '../screens/account/PrivacyPolicyScreen';
import HelpSupportScreen from '../screens/account/HelpSupportScreen';
import PaymentsScreen from '../screens/account/PaymentsScreen';
import ResetWithActualScreen from '../screens/resetPassWord/ResetWithActualPassword';
import ResetCreatePasswordsScreen from '../screens/resetPassWord/ResetCreateNewPassword';
import { AuthNavigator } from './Navigators'; 

const Stack = createStackNavigator();

const AcountNavigator = () => {
  const {session} = useContext(SessionContext);

  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="AcountScreen"
        children={() => <AcountScreen session={session} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        children={() => <ProfileScreen session={session} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingScreen"
        children={() => <SettingScreen session={session} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpSupportScreen"
        component={HelpSupportScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PaymentsScreen"
        children={() => <PaymentsScreen session={session} />}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetWithActualScreen"
        component={ResetWithActualScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ResetCreatePasswordsScreen"
        component={ResetCreatePasswordsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AcountNavigator;
