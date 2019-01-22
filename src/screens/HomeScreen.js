import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class HomeScreen extends Component {

  static navigationOptions = {
    title: '',
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignIn = () => {
    this.props.navigation.navigate("SignIn");
  }

  handleSignUp = () => {
    this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Devsapp 1.0</Text>
        <View style={styles.buttonArea}>
          <Button title="Login" onPress={this.handleSignIn} />
          <Button title="Cadastrar" onPress={this.handleSignUp} />
        </View>
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
  buttonArea: {
    flexDirection: "row",
    width: '100%',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
  };
};

const HomeConnect = connect(mapStateToProps, { checkLogin })(HomeScreen);
export default HomeConnect;