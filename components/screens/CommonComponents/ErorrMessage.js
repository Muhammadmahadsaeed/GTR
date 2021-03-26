import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ErorrMessage extends Component {
  constructor() {
    super();
    this.state = {
      flashMessage: false,
    };
  }
  componentDidMount(){
      this.setState({flashMessage: this.props.flashMessage})
      setTimeout(() => this.closeFlashMessage(), 3000);
  }
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  render() {
    return (
      <>
        {this.state.flashMessage ? (
          <View style={styles.flashMessage}>
            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular'}}>
              Please Fill it
            </Text>
          </View>
        ) : null}
      </>
    );
  }
}
const styles = StyleSheet.create({
  flashMessage: {
    position: 'absolute',
    backgroundColor: '#81b840',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
