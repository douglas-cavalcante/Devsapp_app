import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';

import PreloadScreen from './src/screens/PreloadScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConversationsScreen from './src/screens/Conversations';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';

//Criação da store - recebe os reducers e o middleware
let store = createStore(Reducers, applyMiddleware(ReduxThunk));

//Criação da navegação inicial
const AppNavigator = StackNavigator({
  Conversations: {
    screen: ConversationsScreen,
    navigationOptions: {
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