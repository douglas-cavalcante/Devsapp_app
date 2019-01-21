import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ContactsList extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ContactsList</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});

