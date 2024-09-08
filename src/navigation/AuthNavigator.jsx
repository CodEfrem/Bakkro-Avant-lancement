import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/authentication/SignIn';
import SignUpScreen from '../screens/authentication/SignUp';
import CreatePasswordsScreen from '../screens/authentication/CreatePassword';
import CreateSecurityScreen from '../screens/authentication/CreateSecurity';
import OTPSenderScreen from '../screens/authentication/OtpSender';
import OTPConfirmScreen from '../screens/authentication/OtpConfirm';
import { ResetPasswordNavigator } from './Navigators';
import BottomNavigator from './BottomNavigator';
import  LandingScreen from '../screens/landing/Landing';
import TheLoadingScreen from '../screens/loading/Loading'

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='TheLoadingScreen'>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePasswordsScreen"
        component={CreatePasswordsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateSecurityScreen"
        component={CreateSecurityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPSenderScreen"
        component={OTPSenderScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OTPConfirmScreen"
        component={OTPConfirmScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ResetScreen"
        component={ResetPasswordNavigator}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="TheLoadingScreen"
        component={TheLoadingScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
