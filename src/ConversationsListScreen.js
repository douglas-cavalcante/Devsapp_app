import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class ConversationsListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>conversas {this.props.uid}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid,
  };
};


const ConversationsListConnect = connect(mapStateToProps)(ConversationsListScreen);
export default ConversationsListConnect;