import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ConversationsListScreen from './ConversationsListScreen';
import PrivateConversationScreen from './PrivateConversationScreen';

const ConversationsStackNavigator = createStackNavigator({
  ConversationsList: {
    screen: ConversationsListScreen,
    navigationOptions: {
      title: "Suas Conversas",
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

AppContainer.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default AppContainer;