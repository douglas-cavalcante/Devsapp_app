import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class ContactItem extends Component {

  constructor(props) {
    super(props);
  }


  handleClickArea = () => {
    this.props.onPress(this.props.data);
  }


  render() {
    return (
     
        <TouchableHighlight underlayColor="#CCCCCC" style={styles.buttonArea} onPress={this.handleClickArea}>
          <Text>{this.props.data.name}</Text>
        </TouchableHighlight>
    
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