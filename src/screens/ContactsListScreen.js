import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getContactsList, createChat } from '../actions/ChatActions';
import ContactItem from '../components/contactsList/ContactItem';

export class ContactsListScreen extends Component {

  
  constructor(props) {
    super(props);
    this.state = {};

  }


  handleClickContact = (item) => {
    this.props.createChat(this.props.uid, item.key);
    
  }

  componentDidMount() {
    this.props.getContactsList(this.props.uid);
  }

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.contacts}
          renderItem={({ item }) => { return <ContactItem data={item} onPress={this.handleClickContact} /> }}
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
  };
};


const ContactsListScreenConnect = connect(mapStateToProps, { getContactsList, createChat })(ContactsListScreen);
export default ContactsListScreenConnect;