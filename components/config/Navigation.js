import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';
var {height, width} = Dimensions.get('window');
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import {createDrawerNavigator} from 'react-navigation-drawer';



//import Auth screens
import * as AuthScreens from '../screens/AuthScreen/index';

//import Payment screens
import * as PaymentScreens from '../screens/Payment/index';

//Stack Navigator for the Register
const Register_StackNavigator = createStackNavigator({
  First: {
    screen: AuthScreens.SignupScreen,
    navigationOptions:{
      title: 'SIGN UP YOUR ACCOUNT',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        fontSize:14
    },
    },
  },
  Second: {
    screen: AuthScreens.ChooseImage,
    title: 'none',
    navigationOptions: {
     
      headerTransparent: true,
      headerTintColor: 'black',
     
      
    },
  },
 
});

// Tab Navigation for userlist and giver
const TabScreen = createMaterialTopTabNavigator(
  {
    Giver: { 
      screen: PaymentScreens.OwnPaymentScreen 
    },
    UserList: { 
      screen: PaymentScreens.UserListScreen 
    },
  },
  {
    
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);

//Stack Navigation for Payment
const Payment_StackNavigator = createStackNavigator({
  First: {
    screen: PaymentScreens.PaymentScreen,
    navigationOptions:{
      
    },
  },
  Second: {
    screen: TabScreen,
    title: 'none',
    navigationOptions: {
      headerTintColor: 'black',
    },
  },
 
});

//Authentication
const AuthNavigator = createStackNavigator({
  Login: {
    screen: AuthScreens.LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  
});





const RootNavigator = createSwitchNavigator({
  // SplashScreen: AuthScreens.SplashScreen,
  // AuthScreen: AuthNavigator,
  // RegisterScreen: {
  //   screen : Register_StackNavigator,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  PaymentScreen : Payment_StackNavigator,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
