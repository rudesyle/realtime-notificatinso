import React from 'react';
import { createAppContainer, createSwitchNavigator,DrawerItems, SafeAreaView  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from 'App/Containers/Login/LoginScreen';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import KeywordListScreen from 'App/Containers/KeywordList/KeywordListScreen';
import SetUpScreen from 'App/Containers/SetUpScreen/SetUpScreen';
import LogOutScreen from 'App/Containers/LogOutScreen/LogOutScreen';
import { View,Button } from 'react-native';
import LoginService from 'App/Services/LoginService';

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
},
{
  contentComponent: LogOutScreen,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
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
