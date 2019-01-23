import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ConversationsListScreen from './ConversationsListScreen';
import PrivateConversationScreen from './PrivateConversationScreen';

const ConversationsStackNavigator = StackNavigator({
  ConversationsList: {
    screen: ConversationsListScreen,
    navigationOptions: {
      title: "conversas"
    }
  },
  PrivateConversation: {
    screen: PrivateConversationScreen,
    navigationOptions: {
      title: "privado"
    }
  }
}, {
    initialRouteName: "ConversationsList",
  }
);

export default ConversationsStackNavigator;