//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Text,SafeAreaView} from 'react-native';

// import all basic components

export default class Shop extends Component {
  //Screen1 Component
  render() {
    return (
      <SafeAreaView style={{flex:1}} >
        <View style={styles.MainContainer}>
          <Text style={{fontSize: 23}}> Shop </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});
