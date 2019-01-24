import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView, TouchableHighlight, FlatList, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat, sendMessage, monitorChat, monitorChatOff } from '../actions/ChatActions';
import MessageItem from '../components/privateConversation/MessageItem';


export class PrivateConversationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Chat Privado'),
    headerLeft: (
      <TouchableHighlight underlayColor="white" onPress={navigation.getParam('voltar')}>
        <Image source={require('../../assets/images/back.png')} style={styles.iconBack} />
      </TouchableHighlight>
    ),
  });

  backScreen = () => {
    this.props.monitorChatOff(this.props.activeChat);

    this.props.setActiveChat('');
    this.props.navigation.goBack();

    return true;
  }

  componentDidMount() {
    this.props.navigation.setParams({ voltar: this.backScreen });
    //cuidado - deve ficar so na tela
    BackHandler.addEventListener('hardwareBackPress', this.backScreen);
    this.props.monitorChat(this.props.activeChat);
  }

  componentWillUnmount() {
    //precauções
    BackHandler.removeEventListener('hardwareBackPress', this.backScreen);
  }

  sendMessage = () => {
    if (this.state.message) {
      let txt = this.state.message;
      this.props.sendMessage(txt, this.props.uid, this.props.activeChat);
      this.setState({ message: '' });

    }
  }
  render() {
    let areaBehavior = Platform.select({ ios: 'padding', android: null });
    let AreaOffset = Platform.select({ ios: '64', android: null });
    return (
      <KeyboardAvoidingView style={styles.container} behavior={areaBehavior} keyboardVerticalOffset={AreaOffset}>
        <FlatList
          ref={(ref) => { this.chatArea = ref }}
          onContentSizeChange={() => this.chatArea.scrollToEnd({ animated: true })}
          onLayout={() => this.chatArea.scrollToEnd({ animated: true })}
          style={styles.chatArea}
          data={this.props.activeChatMessages}
          renderItem={({ item }) => <MessageItem data={item} me={this.props.uid} />}
        />
        <View style={styles.sendArea}>
          <TextInput style={styles.sendInput} value={this.state.message} onChangeText={(message) => this.setState({ message })} />
          <TouchableHighlight style={styles.sendButton} onPress={this.sendMessage}>
            <Image style={styles.sendImage} source={require('../../assets/images/send.png')} />
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconBack: {
    width: 25,
    height: 35,
    marginLeft: 25
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  sendArea: {
    backgroundColor: "#EEEEEE",
    height: 50,
    flexDirection: 'row',
    padding: 10

  },
  sendInput: {
    height: 50,
    borderBottomWidth: 1,
    flex: 1
  },
  sendButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendImage: {
    height: 40,
    width: 40
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid,
    activeChat: state.chat.activeChat,
    activeChatMessages: state.chat.activeChatMessages
  };
};


const PrivateConversationScreenConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff })(PrivateConversationScreen);
export default PrivateConversationScreenConnect;