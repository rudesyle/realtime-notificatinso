import React from "react";
import {Platform,Text,View,Button,ActivityIndicator,Image } from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Images } from "App/Theme";
import LoginActions from "App/Stores/Login/Actions";
import KeywordListActions from "App/Stores/KeywordList/Actions";
import Style from "./KeywordListScreenStyle";
import DeviceStorage from "App/Services/DeviceStorage";
import Auth0 from "react-native-auth0";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerActions } from 'react-navigation-drawer';
import TopBarScreen from 'App/Containers/TopBar/TopBarScreen';

const auth0 = new Auth0({
  clientId: "SAwA87Ypu2Ys8asXV5u41vZPLBDNhOM7",
  domain: "realtimemed-beta.auth0.com"
});

class KeywordListScreen extends React.Component {

  constructor(props) {
    super(props);
    
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if(accessToken){
        //this._fetchKeywords();   
      }
    });  
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

  _onProfile = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  render() {
    return (
       
      <View>
      <TopBarScreen navigation={this.props.navigation}></TopBarScreen>            
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={Style.container}>
            <Text style={Style.text}>STOP THY MADNESS!!!!</Text>
            <Button onPress={this._logout} title="Logout" />
            <Button onPress={this._onProfile} title="Show Drawer" />
          </View>
        )}
      </View>
    );
  }

  _fetchKeywords() {
    this.props.fetchKeywords();      
  }
}

KeywordListScreen.propTypes = {
  keywords: PropTypes.object,
  fetchKeywordsLoading: PropTypes.bool,
  fetchKeywordsErrorMessage: PropTypes.string,
  fetchKeywords: PropTypes.func
};

const mapStateToProps = state => ({
  keywords: state.keywordList.keywords,
  fetchKeywordsLoading: state.keywordList.fetchKeywordsLoading,
  fetchKeywordsErrorMessage: state.keywordList.fetchKeywordsErrorMessage,
});

const mapDispatchToProps = dispatch => ({
  fetchKeywords: () => dispatch(KeywordListActions.fetchKeywords())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordListScreen);