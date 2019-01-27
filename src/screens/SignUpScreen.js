import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native';

import { connect } from 'react-redux';
import { changeName, changeEmail, changePassword, signUp } from '../actions/AuthActions';

import LoadingItem from '../components/LoadingItem';

export class SignUpScreen extends Component {

  static navigationOptions = {
    title: 'Cadastro',
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidUpdate() {
    if (this.props.status == 1) {
      Keyboard.dismiss();
      this.props.navigation.navigate('Conversations');
    }
  }

  handleOnPress = () => {
    const { name, email, password } = this.props;
    this.setState({ loading: true });
    this.props.signUp(name, email, password, () => this.setState({ loading: false }));
  }

  render() {
    const { name, email, password, changeName, changeEmail, changePassword } = this.props;
    return (
      <View style={styles.container}>
        <Text>Digite seu Nome:</Text>
        <TextInput style={styles.input} value={name} onChangeText={changeName} />
        <Text>Digite seu Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={changeEmail} />
        <Text>Digite sua senha:</Text>
        <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={changePassword} />
        <View style={styles.addButton} >
          <Button title="Cadastrar" onPress={this.handleOnPress} />
        </View>
        <LoadingItem visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center'
  },
  input: {
    width: '80%',
    fontSize: 18,
    height: 50,
    padding: 10,
    backgroundColor: '#DDDDDD',
  },
  addButton: {
    marginTop: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
    email: state.auth.email,
    password: state.auth.password,
    status: state.auth.status
  };
};

const SignUpConnect = connect(mapStateToProps, { changeName, changeEmail, changePassword, signUp })(SignUpScreen);
export default SignUpConnect;