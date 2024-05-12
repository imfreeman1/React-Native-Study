import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthHomeScreen from '../screens/AuthHomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {authNavigationList} from '../constants';

export type AuthStackParamList = {
  [authNavigationList.AUTH_HOME]: undefined;
  [authNavigationList.LOGIN]: undefined;
  [authNavigationList.SIGN_UP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigationList.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={authNavigationList.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={authNavigationList.SIGN_UP}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
