import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { signOut } from "../actions/AuthActions";
import { resetInfo } from "../actions/ChatActions";

export class ConfigScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = async () => {
    await this.props.resetInfo();
    await this.props.signOut();
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ]
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textConfig}>Configurações</Text>
        <Button title="Sair" onPress={this.logout} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    alignItems: 'center',
  },
  textConfig: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,

  }
});

const ConfigConnect = connect(mapStateToProps, { signOut, resetInfo })(ConfigScreen);
export default ConfigConnect;

