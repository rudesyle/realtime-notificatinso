import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from 'App/Containers/Login/LoginScreen';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import KeywordListScreen from 'App/Containers/KeywordList/KeywordListScreen';

const AppStack = createStackNavigator({ Home: { screen: KeywordListScreen, path: 'realtimenotifications/:keywordlist' } });
const AuthStack = createStackNavigator({ SignIn: { screen: LoginScreen, path: 'realtimenotifications/:login' } });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
