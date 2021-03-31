import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class SignupHeader extends Component {
    render() {
        return (
            <View style={{height: 65,justifyContent: 'center',backgroundColor:'red', alignItems: 'flex-start' }}>
               <Text>SIGN UP YOUR ACCOUNT</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
  
});
