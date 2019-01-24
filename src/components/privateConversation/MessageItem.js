import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formattedDate } from '../../helpers';

export default class MessageItem extends Component {

  constructor(props) {
    super(props);
    let bgColor = "#EEEEEE";
    let align = 'flex-start';
    let txtAlign = 'left';

    if (this.props.data.uid == this.props.me) {
      bgColor = "#9999FF";
      align = 'flex-end';
      txtAlign = 'right'
    }
    this.state = {
      bgColor: bgColor,
      align: align,
      txtAlign: txtAlign,
      date: formattedDate(this.props.data.date),
    }
  }
  

  render() {
    return (
      <View style={[styles.messageBox, { alignSelf: this.state.align, backgroundColor: this.state.bgColor }]}>
        <Text style={{ textAlign: this.state.txtAlign }}>{this.props.data.m}</Text>
        <Text style={styles.dateTxt}>{this.state.date}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  messageBox: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#999999',
    padding: 10,
    maxWidth: '80%',
    borderRadius: 5
  },
  dateTxt: {
    fontSize: 11,
    textAlign: 'right'

  }
});