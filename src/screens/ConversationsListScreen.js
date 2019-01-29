import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getChatsList, setActiveChat } from '../actions/ChatActions';
import ConversationsItem from '../components/conversationsList/ConversationsItem';

export class ConversationsListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
   
  }

  componentDidUpdate() {
    this.props.getChatsList(this.props.uid,() => {});
    if (this.props.activeChat != '') {
      console.log(this.props.activeChatTitle)
      //this.props.navigation.navigate('PrivateConversation', { title: this.props.activeChatTitle });
    }
  }

  handleClickConversation = (data) => {
    this.props.setActiveChat(data.key);
  }


  componentWillMount(){
    this.props.getChatsList(this.props.uid, () => this.setState({ loading: false }));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <ActivityIndicator size="large" />}
        <FlatList
          data={this.props.chats}
          renderItem={({ item }) =>  <ConversationsItem data={item} onPress={this.handleClickConversation} /> }
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
    uid: state.auth.uid,
    chats: state.chat.chats,
    activeChat: state.chat.activeChat,
    activeChatTitle: state.chat.activeChatTitle
  };
};

const ConversationsListConnect = connect(mapStateToProps, { getChatsList, setActiveChat })(ConversationsListScreen);
export default ConversationsListConnect;