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

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';



//import Auth screens
import * as AuthScreens from '../screens/AuthScreen/index';

//import Payment screens
import * as PaymentScreens from '../screens/Payment/index';
//import common components back button hamburger
import * as CommonComponents from '../screens/CommonComponents/index';
import Screen1 from '../screens/Home';



//Stack Navigator for the Register
const Register_StackNavigator = createStackNavigator({
  First: {
    screen: AuthScreens.SignupScreen,
    navigationOptions:{
      title: 'SIGN UP YOUR ACCOUNT',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1,
        fontSize:14,
        fontFamily:'Montserrat-Regular_0',
        color:'white'
    },
    headerStyle:{
      backgroundColor:'#3d900e',
      shadowOffset:{
        height:0,
        width:0
      },
      shadowOpacity:0,
      elevation:0
    },
    
    },
  },
  Second: {
    screen: AuthScreens.ChooseImage,
    title: 'none',
    navigationOptions: {
     
      headerTransparent: true,
      headerBackImage:() => <CommonComponents.HeaderBackButton />,
      
      
    },
  },
 
});

// Tab Navigation for userlist and giver
const TabScreen = createMaterialTopTabNavigator({
    Giver: { 
      screen: PaymentScreens.OwnPaymentScreen 
    },
    'User List': { 
      screen: PaymentScreens.UserListScreen 
    },
  },
  {
    tabBarComponent: PaymentScreens.GiverUserTabBar,
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "green",
     
    },
    initialRouteName: "Giver"
  },
  
);

// Tab Navigation for Premium and pay it forward
const PaymentTabScreen = createMaterialTopTabNavigator({
  Premium: { 
    screen: PaymentScreens.Premium 
  },
  'Pay it forward': { 
    screen: PaymentScreens.PayItForwardScreen 
  },
},
{
  tabBarComponent: PaymentScreens.PaymentTabBar,
  tabBarOptions: {
    activeTintColor: "white",
    inactiveTintColor: "green",
   
  },
  initialRouteName: "Premium"
},

);
//Stack Navigation for Payment
const Payment_StackNavigator = createStackNavigator({
  First: {
    screen: PaymentTabScreen,
    navigationOptions:({ navigation }) => ({
      headerRight:() => <CommonComponents.HamBurger  navigationProps={navigation} />,
      headerStyle:{
        backgroundColor:'transparent',
        shadowOffset:{
          height:0,
          width:0
        },
        shadowOpacity:0,
        elevation:0
      },
     
    }),
  },
  Second : {
    screen : PaymentScreens.PaymentForm,
    title: 'none',
    navigationOptions:  ({ navigation }) => ({
      headerRight:() => <CommonComponents.HamBurger navigationProps={navigation}/>,
      headerStyle:{
        backgroundColor:'transparent',
        shadowOffset:{
          height:0,
          width:0
        },
        shadowOpacity:0,
        elevation:0
      },
      headerBackImage:() => <CommonComponents.HeaderBackButton />,
     
    }),
  
  },
  Third: {
    screen: TabScreen,
    title: 'none',
    navigationOptions:  ({ navigation }) => ({
      headerRight:() => <CommonComponents.HamBurger navigationProps={navigation}/>,
      headerStyle:{
        backgroundColor:'transparent',
        shadowOffset:{
          height:0,
          width:0
        },
        shadowOpacity:0,
        elevation:0
      },
      headerBackImage:() => <CommonComponents.HeaderBackButton />,
     
    }),
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
  ForgotPassword: {
    screen : AuthScreens.ForgotPassword,
    navigationOptions: {
      headerStyle:{
        backgroundColor:'transparent',
        shadowOffset:{
          height:0,
          width:0
        },
        shadowOpacity:0,
        elevation:0
      },
      headerBackImage:() => <CommonComponents.HeaderBackButton />,
    },
  },
  
  
});

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator({
    //Drawer Optons and indexing
    NavScreen1: {
      screen: Payment_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 1',
      },
    },
   
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CommonComponents.CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
    drawerPosition:'right'
  }
);



const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.SplashScreen,
  AuthScreen: AuthNavigator,
  ResetPassword: {
    screen : AuthScreens.ResetPassword,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen : Register_StackNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  
  Drawer : DrawerNavigator
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
