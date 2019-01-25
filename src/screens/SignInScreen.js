import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { changeEmail, changePassword, signIn } from '../actions/AuthActions';
import LoadingItem from '../components/LoadingItem';

export class SignInScreen extends Component {

  static navigationOptions = {
    title: 'Login',
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
    this.setState({ loading: true });
    this.props.signIn(this.props.email, this.props.password, () => this.setState({ loading: false }));
  }

  render() {
    const { email, password, changeEmail, changePassword } = this.props;
    return (
      <View style={styles.container}>
        <Text>Digite seu Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={changeEmail} />
        <Text>Digite sua senha:</Text>
        <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={changePassword} />
        <Button title="Entrar" onPress={this.handleOnPress} />
        <LoadingItem visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    width: '80%',
    fontSize: 23,
    height: 50,
    padding: 10,
    backgroundColor: '#DDDDDD'
  }
});

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    uid: state.auth.uid,
    status: state.auth.status
  };
};

const SignInConnect = connect(mapStateToProps, { changeEmail, changePassword, signIn })(SignInScreen);
export default SignInConnect;