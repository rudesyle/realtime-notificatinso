import React from "react";
import {Platform,Text,View,WebView,Button,ActivityIndicator,Image,FlatList } from "react-native";
import styles from "./KeywordListScreenStyle";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Images } from "App/Theme";
import LoginActions from "App/Stores/Login/Actions";
import KeywordListActions from "App/Stores/KeywordList/Actions";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerActions } from 'react-navigation-drawer';
import TopBarScreen from 'App/Containers/TopBar/TopBarScreen';
import KeywordItem from 'App/Components/KeywordItem';

class KeywordListScreen extends React.Component {
  componentDidMount() {
    AsyncStorage.getItem('accessToken').then((accessToken) => {

      if(accessToken){
        this._fetchKeywords();   
      }
    });  
  }

  _keyExtractor = (item, index) => item.KeywordId;

  _renderItem = ({item}) => (
    <View style={styles.keywordRow}>
      <Text style={styles.keyword}>{item.Keyword}</Text>
      <Text style={styles.keywordDetails}> - noted by </Text>
      <Text style={styles.keywordInitialsAndDate}> {item.Initials}</Text> 
      <Text style={styles.keywordDetails}> on</Text> 
      <Text style={styles.keywordInitialsAndDate}> {item.EventDt}</Text>
      <Text style={styles.keywordDetails}> {item.KeywordPhrase}</Text>
    </View>
  );

_listEmptyComponent = () => {
    return (
        <View>
            <Text>I HAVE JACK SQUATTAH</Text>
        </View>
    )
  }

  render() {
    return (
       
      <View>
        <TopBarScreen navigation={this.props.navigation}></TopBarScreen>      
        <View>    
          <FlatList
            data={this.props.keywords}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={this._listEmptyComponent}
          />
        </View>  
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