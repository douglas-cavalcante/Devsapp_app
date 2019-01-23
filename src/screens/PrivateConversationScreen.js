import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat } from '../actions/ChatActions';
import { withNavigation } from 'react-navigation'
export class PrivateConversationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Privado",
    headerLeft: (
      <TouchableHighlight underlayColor="white" onPress={navigation.getParam('voltar')}>
        <Image source={require('../../assets/images/back.png')} style={styles.iconBack} />
      </TouchableHighlight>
    ),
  });

  backScreen = () => {
    this.props.setActiveChat('');
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    this.props.navigation.setParams({ voltar: this.backScreen });
    //cuidado - deve ficar so na tela
    BackHandler.addEventListener('hardwareBackPress', this.backScreen);
  }

  componentWillUnmount(){
    //precauções
    BackHandler.removeEventListener('hardwareBackPress', this.backScreen);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>conversa interna</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  iconBack: {
    width: 25,
    height: 35,
    marginLeft: 25
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    uid: state.auth.uid,
  };
};


const PrivateConversationScreenConnect = connect(mapStateToProps, { setActiveChat })(PrivateConversationScreen);
export default withNavigation(PrivateConversationScreenConnect);