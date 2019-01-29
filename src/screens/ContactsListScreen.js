import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getContactsList, createChat } from '../actions/ChatActions';
import ContactItem from '../components/contactsList/ContactItem';

export class ContactsListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleClickContact = async (item) => {
    let found = false;
    for (let i in this.props.chats) {
      if (this.props.chats[i].other == item.key) {
        found = true;
        console.log("entrei")
      }
    }
    if (found == false) {
      console.log(item.key)
      await this.props.createChat(this.props.uid, item.key);
      this.props.navigation.navigate('ConversationsList');
    } else {
      alert("Já existe um CHAT com este usuário...");
    }
  }

  componentDidMount() {
    this.props.getContactsList(this.props.uid, () => this.setState({ loading: false }));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <ActivityIndicator size="large" />}
        <FlatList
          data={this.props.contacts}
          renderItem={({ item }) => <ContactItem data={item} onPress={this.handleClickContact} />}
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
    contacts: state.chat.contacts,
    chats: state.chat.chats
  };
};

const ContactsListScreenConnect = connect(mapStateToProps, { getContactsList, createChat })(ContactsListScreen);
export default ContactsListScreenConnect;