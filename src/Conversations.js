import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import ConversationsListScreen from './ConversationsListScreen';
import ContactsListScreen from './ContactsListScreen';
import ConfigScreen from './ConfigScreen';

const ConversationNavigator = createBottomTabNavigator({
  ConversationsList: {
    screen: ConversationsListScreen,
    navigationOptions: {
      tabBarLabel: "Conversas"
    }
  },
  ContactsList: {
    screen: ContactsListScreen,
    navigationOptions: {
      tabBarLabel: "Contatos"
    }
  },
  Config: {
    screen: ConfigScreen,
    navigationOptions: {
      tabBarLabel: "Configurações"
    }
  }
}, {
    initialRouteName: "ConversationsList",
    tabBarPosition: "bottom",
    animationEnabled: "true",
    swipeEnabled: "false",
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      tabStyle: {
        opacity: 1,
        backgroundColor: '#00BFFF',
      },
    },

  }
);

export default ConversationNavigator