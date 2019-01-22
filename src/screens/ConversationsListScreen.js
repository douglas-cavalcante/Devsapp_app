import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class ConversationsListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    if (this.props.activeChat != '') {
      this.props.navigation.navigate('PrivateConversation');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>conversas {this.props.uid}</Text>
        <Button title="ir" onPress={() => this.props.navigation.navigate("PrivateConversation")} />
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
    activeChat: state.chat.activeChat,
  };
};


const ConversationsListConnect = connect(mapStateToProps)(ConversationsListScreen);
export default ConversationsListConnect;