import React from 'react';
import {
 Platform, Text, View, Button, ActivityIndicator, Image 
} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Images } from 'App/Theme'
import LoginActions from 'App/Stores/Login/Actions'
import Style from './KeywordListScreenStyle'
import DeviceStorage from 'App/Services/DeviceStorage'; 
import Auth0 from 'react-native-auth0';

//var credentials = require('./auth0-configuration');
const auth0 = new Auth0({
  clientId: "SAwA87Ypu2Ys8asXV5u41vZPLBDNhOM7",
  domain: "realtimemed-beta.auth0.com"
});


class KeywordListScreen extends React.Component {
  componentDidMount() {
    this._fetchUser();
  }

    _onLogout = () => {
      auth0.webAuth
          .clearSession({})
          .then(success => {
            DeviceStorage.removeItem("accessToken");
            DeviceStorage.removeItem("idToken");
            this.props.navigation.navigate('Auth');
          })
          .catch(error => {
              console.log('Log out cancelled');
          });
  };

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text style={Style.text}>To get started, don't be an asshole</Text>
            <Button onPress = {this._onLogout} title = 'Log Out'/>
          </View>
        )}
      </View>
    );
  }

  _fetchUser() {
    this.props.fetchUser();
  }
}

KeywordListScreen.propTypes = {
  fetchUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(LoginActions.fetchUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordListScreen)
;