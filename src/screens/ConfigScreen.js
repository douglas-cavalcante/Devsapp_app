import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { signOut } from "../actions/AuthActions";
import NavigationService from '../screens/NavigationService';

export class ConfigScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    this.props.signOut();
    // Como manter o comportamente
    NavigationService.navigate('Home',{});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Configurações</Text>
        <Button title="Sair" onPress={this.logout} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 50,
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid
  }
}

const ConfigConnect = connect(mapStateToProps, { signOut })(ConfigScreen);
export default ConfigConnect;

