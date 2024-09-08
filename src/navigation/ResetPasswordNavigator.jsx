import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResetWithPhoneNumberScreen from '../screens/resetPassWord/ResetWithPhoneNumber';
import ResetWithSecurityQuestionScreen from '../screens/resetPassWord/ResetSecurityQuestion';
import ResetCreatePasswordsScreen from '../screens/resetPassWord/ResetCreateNewPassword';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const ResetPasswordNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ResetWithPhoneNumberScreen">
      <Stack.Screen
        name="ResetWithPhoneNumberScreen"
        component={ResetWithPhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ResetWithSecurityQuestionScreen" 
        options={{ headerShown: false }}
        component={ResetWithSecurityQuestionScreen}
      />
      <Stack.Screen
        name="ResetCreatePasswordsScreen"
        options={{ headerShown: false }}
        component={ResetCreatePasswordsScreen}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ResetPasswordNavigator;
