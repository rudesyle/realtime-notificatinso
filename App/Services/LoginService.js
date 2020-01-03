import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Auth0 from 'react-native-auth0';
import DeviceStorage from 'App/Services/DeviceStorage';
import NavigationService from 'App/Services/NavigationService';

const auth0 = new Auth0({
  clientId: 'SAwA87Ypu2Ys8asXV5u41vZPLBDNhOM7',
  domain: 'realtimemed-beta.auth0.com',
});

function logOut() {
  auth0.webAuth
    .clearSession({})
    .then((success) => {
      DeviceStorage.removeItem('accessToken');
      DeviceStorage.removeItem('idToken');
      // this.props.navigation.navigate("Auth");
      NavigationService.navigateAndReset('Auth');
    })
    .catch((error) => {
      console.log('Log out cancelled');
    });
}

export const loginService = {
  logOut,
};
