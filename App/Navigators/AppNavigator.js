import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from 'App/Containers/Login/LoginScreen';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import KeywordListScreen from 'App/Containers/KeywordList/KeywordListScreen';
import SetUpScreen from 'App/Containers/SetUpScreen/SetUpScreen';
import LogOutScreen from 'App/Containers/LogOutScreen/LogOutScreen';
import { Icon } from 'react-native-elements';

const AppStack = createStackNavigator({
  Home: {
    screen: KeywordListScreen,
    path: 'realtimenotifications/:keywordlist',
  },
});
const AuthStack = createStackNavigator({
  SignIn: { screen: LoginScreen, path: 'realtimenotifications/:login' },
});

const MenuDrawer = createDrawerNavigator({
  Home: {
    screen: KeywordListScreen,
  },
  Setup: {
    screen: SetUpScreen,
  },
  LogOut: {
    screen: LogOutScreen,
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashScreen,
      Auth: AuthStack,
      App: AppStack,
      Profile: MenuDrawer,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
