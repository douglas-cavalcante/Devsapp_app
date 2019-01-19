import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from './actions/AuthActions';

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



  redirectPages = () => {
    switch (this.props.status) {
      case 1:
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'ConversationsScreen', })
          ]
        }));
        break;
      case 2:
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home', })
          ]
        }));
        break;
      default:
        break;
    }

  }

  componentDidMount() {
    this.redirectPages();
  }

  //Depois que atualiza o render 
  componentDidUpdate() {
    this.redirectPages();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.status}</Text>
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

const PreloadConnect = connect(mapStateToProps, { checkLogin })(PreloadScreen);
export default PreloadConnect;