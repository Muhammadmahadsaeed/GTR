import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

export default class HamBurger extends Component {
  toggleDrawer = () => {
    
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../../../assets/hamburger.png')}
            style={{height: 30, width: 35, marginRight: 15}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
