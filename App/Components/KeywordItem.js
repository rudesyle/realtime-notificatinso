import React, { Component } from 'react';
import {
  View, Text, Image, TouchableHighlight, StyleSheet,
} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: props.data.msg,
    };

    this.click2 = this.click.bind(this);
  }


  render() {
    return (
      <TouchableHighlight onPress={this.click2} underlayColor="#CCCCCC">
        <View style={styles.item}>
          <Text>
            {this.props.data.Keyword}
            {' '}
- noted by
            {' '}
            {this.props.data.Initials}
            {' '}
on
            {' '}
            {this.props.data.EventDt}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    flex: 1,
    flexDirection: 'row',
  },
  imagem: {
    width: 40,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
