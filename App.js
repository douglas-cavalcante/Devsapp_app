import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';
import PreloadScreen from './src/PreloadScreen';
import { HomeScreen } from './src/HomeScreen';
import { ConversationsScreen } from './src/ConversationsScreen';

//Criação da store - recebe os reducers e o middleware
let store = createStore(Reducers, applyMiddleware(ReduxThunk));

//Criação da navegação
const AppNavigator = createStackNavigator({
  Preload: {
    screen: PreloadScreen
  },
  Home:{
    screen: HomeScreen
  },
  ConversationsScreen:{
    screen: ConversationsScreen
  }
});
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}