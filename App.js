import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';
import PreloadScreen from './src/PreloadScreen';
import HomeScreen from './src/HomeScreen';
import ConversationsScreen from './src/Conversations';
import SignUpScreen from './src/SignUpScreen';
import SignInScreen from './src/SignInScreen';

//Criação da store - recebe os reducers e o middleware
let store = createStore(Reducers, applyMiddleware(ReduxThunk));

//Criação da navegação
const AppNavigator = StackNavigator({
  Conversations: {
    screen: ConversationsScreen,
    navigationOptions:{
      header: null,
    }
  },
  Preload: {
    screen: PreloadScreen
  },
  Home: {
    screen: HomeScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  SignIn: {
    screen: SignInScreen
  },
}, {
    initialRouteName: 'Preload'
  });


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}