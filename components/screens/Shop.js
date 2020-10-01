//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-navigation';
// import all basic components

export default class Shop extends Component {
  //Screen1 Component
  render() {
    return (
      <SafeAreaView style={{flex: 1}} forceInset={{top:'always'}}>
        <View style={{flex: 1, padding: 16}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 23}}> Shop </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 16,
  },
});
