import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getChatsList, setActiveChat } from '../actions/ChatActions';
import ConversationsItem from '../components/conversationsList/ConversationsItem';

export class ConversationsListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    if (this.props.activeChat != '') {
      this.props.navigation.navigate('PrivateConversation', { title: this.props.activeChatTitle });
    }
  }

  componentDidMount() {
    this.props.getChatsList(this.props.uid);
  }

  handleClickConversation = (data) => {
    this.props.setActiveChat(data.key);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.chats}
          renderItem={({ item }) => { return <ConversationsItem data={item} onPress={this.handleClickConversation} /> }}
        />
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
    chats: state.chat.chats,
    activeChatTitle: state.chat.activeChatTitle
  };
};


const ConversationsListConnect = connect(mapStateToProps, { getChatsList, setActiveChat })(ConversationsListScreen);
export default ConversationsListConnect;