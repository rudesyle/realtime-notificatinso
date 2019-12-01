import React from 'react';
import {
 Platform, Text, View, Button, ActivityIndicator, Image, StyleSheet , Alert, TouchableOpacity, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { liveInEurope } from 'App/Stores/Example/Selectors';
import { Images } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import Style from './ExampleScreenStyle'
import ExampleActions from 'App/Stores/Example/Actions'
import Auth0 from 'react-native-auth0';
import PushNotification from 'react-native-push-notification'
import NotifService from 'App/Services/NotifService'
import DeviceInfo from 'react-native-device-info'

//var credentials = require('./auth0-configuration');
const auth0 = new Auth0({
  clientId: "SAwA87Ypu2Ys8asXV5u41vZPLBDNhOM7",
  domain: "realtimemed-beta.auth0.com"
});


export default class ExampleScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = { accessToken: null, deviceId:'floopstars', registerToken:null }; 
      
  }

componentDidMount() {
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  _onLogin = () => {
      auth0.webAuth
          .authorize({
              scope: 'openid profile email'
          })
          .then(credentials => {
            console.log('here');
              Alert.alert('AccessToken: ' + credentials.accessToken);
              this.setState({ accessToken: credentials.accessToken });
          })
          .catch(error => console.log(error));
  };

  _onLogout = () => {
      auth0.webAuth
          .clearSession({})
          .then(success => {
              Alert.alert('Logged out!');
              this.setState({ accessToken: null });
          })
          .catch(error => {
              console.log('Log out cancelled');
          });
  };

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    //this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

  
  render() {
        let loggedIn = this.state.accessToken === null ? false : true;

        return (
        <View style = { styles.container }>
            <Text style = { styles.header }> Real Time Notifications - Login </Text>
            <Text>
                You are{ loggedIn ? ' ' : ' not ' }logged in {this.state.deviceId}</Text>
                <Button onPress = { loggedIn ? this._onLogout : this._onLogin }
                title = { loggedIn ? 'Log Out' : 'Log In' }/>
            <View style={styles.spacer}></View>
        <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
        <View style={styles.spacer}></View>

        <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}><Text>Local Notification (now)</Text></TouchableOpacity>

        <View style={styles.spacer}></View>
        <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => {this.setState({ senderId: e })}} placeholder="GCM ID" />
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>Configure Sender ID</Text></TouchableOpacity>
        {this.state.gcmRegistered && <Text>GCM Configured !</Text>}
        </View >
        );
    }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});

/*export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExampleScreen);*/
