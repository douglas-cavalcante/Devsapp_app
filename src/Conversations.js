import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import ConversationsListScreen from './ConversationsListScreen';
import ContactsListScreee from './ContactsList';
import ConfigScreen from './ConfigScreen';

const ConversationNavigator = createBottomTabNavigator({
  ConversationsList: {
    screen: ConversationsListScreen,
    navigationOptions: {
      tabBarLabel: "Conversas"
    }
  },
  ContactsList: {
    screen: ContactsListScreee,
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