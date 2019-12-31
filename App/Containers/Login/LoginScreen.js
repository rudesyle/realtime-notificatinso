import React from "react";
import {
  Platform,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import NavigationService from "App/Services/NavigationService";
import SaveDeviceActions from "App/Stores/SaveDevice/Actions";
import Auth0 from "react-native-auth0";
import DeviceInfo from "react-native-device-info";
import DeviceStorage from "App/Services/DeviceStorage";
import { Config } from "App/Config";
import AsyncStorage from "@react-native-community/async-storage";

const auth0 = new Auth0({
  clientId: Config.AUTH0_CLIENT_ID,
  domain: Config.AUTH0_DOMAIN
});

class LoginScreen extends React.Component {

  componentDidMount() {
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if(! accessToken){
        this._onLogin();
      }
    });  
  }

  _onLogin = () => {

    auth0.webAuth
      .authorize({
        scope: "openid profile email",
        audience: Config.AUTH0_AUDIENCE
      })
      .then(res => {
        DeviceStorage.saveItem("accessToken", res.accessToken);
        DeviceStorage.saveItem("idToken", res.idToken);
        DeviceStorage.logCurrentStorage();
        this._saveDevice();
        this.props.navigation.navigate("App");
      })
      .catch(error => console.log(error));
  };

  _saveDevice() {
    this.props.saveDevice();
  }

  render() {
    return <View />;
  }
}

LoginScreen.propTypes = {
  saveDevice: PropTypes.func
};

const mapStateToProps = state => ({
  device: state.example.device,
  saveDeviceLoading: state.example.saveDeviceLoading,
  saveDeviceErrorMessage: state.example.saveDeviceErrorMessage
});

const mapDispatchToProps = dispatch => ({
  saveDevice: () => dispatch(SaveDeviceActions.saveDevice())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
