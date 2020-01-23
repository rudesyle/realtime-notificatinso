import React from "react";
import {Platform,Text,View,Button,ActivityIndicator,Image,FlatList } from "react-native";
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
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import HamburgerMenu from 'App/Components/HamburgerMenu';

class KeywordListScreen extends React.Component {
  static navigationOptions = {
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="blue"
      />
    ),
  };

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
      <Text style={styles.keywordNotedBy}> - noted by </Text>
      <Text style={styles.keywordInitialsAndDate}> {item.Initials}</Text> 
      <Text style={styles.keywordNotedBy}> on</Text> 
      <Text style={styles.keywordInitialsAndDate}> {item.EventDt}</Text>
      <HTML html={item.KeywordPhrase } />
    </View>
  );

_listEmptyComponent = () => {
    return (
        <View>
            <Text>You have no keywords that have triggered</Text>
        </View>
    )
  }

  render() {
    return (                 
        <View>    
          <FlatList
            data={this.props.keywords}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={this._listEmptyComponent}
          />
          <Text>THIS IS THE END</Text>
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