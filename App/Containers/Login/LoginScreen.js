import React from 'react';
import {
 Platform, Text, View, Button, ActivityIndicator, Image, StyleSheet , Alert, TouchableOpacity, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Images } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import LoginActions from 'App/Stores/Login/Actions'
import Auth0 from 'react-native-auth0';
import PushNotification from 'react-native-push-notification'
import NotifService from 'App/Services/NotifService'
import DeviceInfo from 'react-native-device-info'
import DeviceStorage from 'App/Services/DeviceStorage'; 

//var credentials = require('./auth0-configuration');
const auth0 = new Auth0({
  clientId: "SAwA87Ypu2Ys8asXV5u41vZPLBDNhOM7",
  domain: "realtimemed-beta.auth0.com"
});


export default class LoginScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = { accessToken: null, idToken:null, deviceId:'floopstars', registerToken:null };    
  }

componentDidMount() {
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    this._onLogin();
  }

  _onLogin = () => {
      auth0.webAuth
          .authorize({
              scope: 'openid profile email',
              audience: "http://beta.api.rtms.io"
          })
          .then(res => {
            DeviceStorage.saveItem("accessToken", res.accessToken);
            DeviceStorage.saveItem("idToken", res.idToken);
            DeviceStorage.logCurrentStorage();
            this.props.navigation.navigate('App');
          })
          .catch(error => console.log(error));
  };

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    DeviceStorage.saveItem("deviceToken", token);
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }


  render() {
        return (
        <View>
        </View>
        );
    }
}