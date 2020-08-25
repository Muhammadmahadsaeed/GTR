import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default class HeaderBackButton extends Component {
  render() {
    return (
      <Image
        source={require('../../../assets/back.png')}
        style={styles.backImage}
      />
    );
  }
}

const styles = StyleSheet.create({
  backImage: {
    height: 25,
    width: 24,
    marginLeft: 9,
    marginRight: 12,
    marginVertical: 12,
    resizeMode: 'contain',
  },
});
