import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ConversationsListScreen from './ConversationsListScreen';
import PrivateConversationScreen from './PrivateConversationScreen';

const ConversationsStackNavigator = createStackNavigator({
  ConversationsList: {
    screen: ConversationsListScreen,
    navigationOptions: {
      title: "conversas"
    }
  },
  PrivateConversation: {
    screen: PrivateConversationScreen,
  }
}, {
    initialRouteName: "ConversationsList",
  }
);

const AppContainer = createAppContainer(ConversationsStackNavigator);

export default AppContainer;