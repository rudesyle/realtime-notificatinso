/*import React from 'react'
import { Text, View } from 'react-native'
import styles from './SplashScreenStyle'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          {You will probably want to insert your logo here }
          <Text>LOGO</Text>
        </View>
      </View>
    )
  }
}*/
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class SplashScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

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