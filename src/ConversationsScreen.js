import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from './actions/AuthActions';


export class ConversationsScreen extends Component {

  static navigationOptions = {
    title: '',
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>conversas</Text>
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
  };
};


const ConversationsConnect = connect(mapStateToProps, { checkLogin })(ConversationsScreen);
export default ConversationsConnect;