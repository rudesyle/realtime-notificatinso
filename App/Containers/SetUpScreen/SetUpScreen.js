import React from "react";
import {
  Platform,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image
} from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Images } from "App/Theme";
import TopBarScreen from 'App/Containers/TopBar/TopBarScreen';

export default class SetUpScreen extends React.Component {

  render() {
    return (
      <View>
      <TopBarScreen navigation={this.props.navigation}></TopBarScreen> 
        <Text>Setting up my N</Text>
      </View>
    );
  }
}
