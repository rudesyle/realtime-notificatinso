import React from "react";
import {
  Platform,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,Alert
} from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Images } from "App/Theme";
import Auth0 from "react-native-auth0";
import { DrawerItems, SafeAreaView  } from 'react-navigation';
import DeviceStorage from "App/Services/DeviceStorage";

const auth0 = new Auth0({
  clientId: "SAwA87Ypu2Ys8asXV5u41vZPLBDNhOM7",
  domain: "realtimemed-beta.auth0.com"
});

export default class LogOutScreen extends React.Component {

  constructor(props) {
    super(props);
    //_logout();
  }

  _logout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        DeviceStorage.removeItem("accessToken");
        DeviceStorage.removeItem("idToken");
        this.props.navigation.navigate("Auth");
      })
      .catch(error => {
        console.log("Log out cancelled");
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...this.props} />
        <Button title="Logout"  onPress={this._logout} />
      </SafeAreaView>
    </View>
    );
  }
}
