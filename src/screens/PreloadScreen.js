import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class PreloadScreen extends Component {

  static navigationOptions = {
    title: '',
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.props.checkLogin();
  }


  handleRedirectScreen = () => {
    switch (this.props.status) {
      case 1:
        this.handleDispatch('Conversations');
        break;
      case 2:
        this.handleDispatch('Home');
        break;
      default:
        break;
    }
  }

  handleDispatch = (routeName) => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName }),
      ]
    }));
  }

  componentDidMount() {
    this.handleRedirectScreen();
  }

  componentDidUpdate() {
    this.handleRedirectScreen();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando .... </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 26,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
  };
};

const PreloadConnect = connect(mapStateToProps, { checkLogin })(PreloadScreen);
export default PreloadConnect;