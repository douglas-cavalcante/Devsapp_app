import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class ConversationsItem extends Component {

  constructor(props) {
    super(props);
  }


  handleClickArea = () => {
    this.props.onPress(this.props.data);
  }


  render() {
    return (
      <View>
        <TouchableHighlight underlayColor="#CCCCCC" style={styles.buttonArea} onPress={this.handleClickArea}>
          <Text>{this.props.data.key}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonArea: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#CCCCCC"
  }
});