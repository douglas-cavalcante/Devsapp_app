import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ConfigScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Configurações</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});

