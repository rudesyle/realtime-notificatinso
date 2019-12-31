
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import NotifService from "App/Services/NotifService";

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
    this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
  };

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}