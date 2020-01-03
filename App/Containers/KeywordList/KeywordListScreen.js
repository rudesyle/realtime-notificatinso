import React from "react";
import {Platform,Text,View,Button,ActivityIndicator,Image, FlatList,TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Images } from "App/Theme";
import LoginActions from "App/Stores/Login/Actions";
import KeywordListActions from "App/Stores/KeywordList/Actions";
import Style from "./KeywordListScreenStyle";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerActions } from 'react-navigation-drawer';
import TopBarScreen from 'App/Containers/TopBar/TopBarScreen';

class KeywordListScreen extends React.Component {
  componentDidMount() {

    AsyncStorage.getItem('accessToken').then((accessToken) => {

      if(accessToken){
        this._fetchKeywords();   
      }
    });  
  }
  
  _onProfile = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  _keyExtractor = (item, index) => item.KeywordId;

  _renderItem = ({item}) => (
    <Text>{item.Keyword} - noted by {item.Initials} on {item.EventDt}</Text> 
  );

  render() {
    return (
       
      <View>
        <TopBarScreen navigation={this.props.navigation}></TopBarScreen>            
        <FlatList
        data={this.props.keywords}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />

      </View>
    );
  }

  _fetchKeywords() {
    this.props.fetchKeywords();      
  }
}

KeywordListScreen.propTypes = {
  keywords: PropTypes.array,
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