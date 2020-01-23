
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,Text,ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import NotifService from "App/Services/NotifService";
import { Helpers } from 'App/Theme'
import styles from './SplashScreenStyle'

export default class SplashScreen extends React.Component {

  constructor() {
    super();
    this._bootstrapAsync();
    this.notif = new NotifService(this.onNotif.bind(this));
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
      }, 2000);
    
  };

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor : '#34495e'}}>
          <StatusBar backgroundColor="#2c3e50" barStyle="light-content"/> 
          <Text style={{ color : 'white',fontSize : 18 }}>Loading Real Time...</Text>
          <ActivityIndicator color={'white'}/> 
      </View>
    );
  }
}