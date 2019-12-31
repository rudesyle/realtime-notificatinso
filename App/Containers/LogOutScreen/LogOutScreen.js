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

export default class LogOutScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>Log out my fool</Text>
      </View>
    );
  }
}
