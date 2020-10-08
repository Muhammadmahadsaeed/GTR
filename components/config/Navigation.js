import React, {Component} from 'react';
import {
  Dimensions,
  Image,
} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

//import Auth screens
import * as AuthScreens from '../screens/AuthScreen/index';

//import Payment screens
import * as PaymentScreens from '../screens/Payment/index';
//import common components back button hamburger
import * as CommonComponents from '../screens/CommonComponents/index';
import * as MainScreen from '../screens/index';
import * as PlayerScreens from '../screens/PlayersScreens/index';




// Tab Navigation for userlist and giver
const TabScreen = createMaterialTopTabNavigator(
  {
    Giver: {
      screen: PaymentScreens.OwnPaymentScreen,
    },
    'User List': {
      screen: PaymentScreens.UserListScreen,
    },
  },
  {
    tabBarComponent: PaymentScreens.GiverUserTabBar,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#81b840',
      style: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    },
    initialRouteName: 'Giver',
  },
);

// Tab Navigation for Premium and pay it forward
const PaymentTabScreen = createMaterialTopTabNavigator(
  {
    Premium: {
      screen: PaymentScreens.Premium,
    },
    'Pay it forward': {
      screen: PaymentScreens.PayItForwardScreen,
    },
  },
  {
    tabBarComponent: PaymentScreens.PaymentTabBar,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#81b840',
      style: {
        borderRadius: 50,
      },
    },
    initialRouteName: 'Premium',
  },
);
//Stack Navigation for Payment
const Payment_StackNavigator = createStackNavigator({
  First: {
    screen: PaymentTabScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
    }),
  },
  
  Second: {
    screen: TabScreen,
    title: 'none',
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});




//Stack Navigation for Home Screen
const Home_StackNavigator = createStackNavigator({
  Home: {
    screen: MainScreen.Home,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#81b840',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
    }),
  },
  DailyChallenges: {
    screen: MainScreen.DailyChallengesScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      headerTitle: '',

      headerStyle: {
        backgroundColor: 'none',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },

  GameScreen: {
    screen: PlayerScreens.AnswerScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'none',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});
//Stack Navigation for Notification Screen
const Notification_StackNavigator = createStackNavigator({
  First: {
    screen: MainScreen.Notification,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});
//Stack Navigation for Winner Screen
const Winner_StackNavigator = createStackNavigator({
  First: {
    screen: MainScreen.Winner,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});
//Stack Navigation for Shop Screen
const Shop_StackNavigator = createStackNavigator({
  First: {
    screen: Payment_StackNavigator,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});
//Stack Navigation for User Screen
const User_StackNavigator = createStackNavigator({
  First: {
    screen: MainScreen.User,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});
//Stack Navigator for the Register
const Register_StackNavigator = createStackNavigator({
  First: {
    screen: AuthScreens.SignupScreen,

    navigationOptions: {
      safeAreaInsets: {top: 0},
      title: 'SIGN UP YOUR ACCOUNT',
      headerTitleStyle: {
        textAlign: 'center',
        // flex: 1,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold_0',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#3d900e',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
    },
  },
  Second: {
    screen: AuthScreens.ChooseImage,
    title: 'none',
    navigationOptions: {
      headerTransparent: true,
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
      headerTitle: '',
    },
  },
});

//Bottom Tab
const BottomTabScreen = createBottomTabNavigator(
  {
    User: {
      screen: User_StackNavigator,
    },
    Shop: {
      screen: Shop_StackNavigator,
    },
    Home: {
      screen: Home_StackNavigator,
    },
    Winner: {
      screen: Winner_StackNavigator,
    },
    Notification: {
      screen: Notification_StackNavigator,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;

        if (routeName == 'Home') {
          return (
            <Image
              source={require('../../assets/homeIcon.png')}
              style={{height: 45, width: 45}}
            />
          );
        } else if (routeName == 'User') {
          return (
            <Image
              source={require('../../assets/userIcon.png')}
              style={{height: 35, width: 30}}
            />
          );
        } else if (routeName == 'Winner') {
          return (
            <Image
              source={require('../../assets/cupIcon.png')}
              style={{height: 35, width: 31}}
            />
          );
        } else if (routeName == 'Shop') {
          return (
            <Image
              source={require('../../assets/shopIcon.png')}
              style={{height: 35, width: 35}}
            />
          );
        } else if (routeName == 'Notification') {
          return (
            <Image
              source={require('../../assets/bellIcon.png')}
              style={{height: 35, width: 30}}
            />
          );
        }
      },
    }),

    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#81b840',
        borderTopWidth: 0,
        paddingTop: 2,
        paddingBottom: 2,
        height: 60,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
    },

    initialRouteName: 'Home',
  },
);


//Authentication
const AuthNavigator = createStackNavigator({
  Login: {
    screen: AuthScreens.LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPassword: {
    screen: AuthScreens.ForgotPassword,
    navigationOptions: {
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'none',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    },
  },
});
//Live Streaming
const LiveStreaming = createStackNavigator({
  LiveScreen: {
    screen: PlayerScreens.LiveStreamingScreen,
    navigationOptions: ({navigation}) => ({
      animationEnabled: true,
      gestureEnabled: true,
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: {top: 0},
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },

      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
  PlayerScreen: {
    screen: PlayerScreens.SeePlayers,
    navigationOptions: ({navigation}) => ({
      animationEnabled: true,
      gestureEnabled: true,
      headerRight: () => (
        <CommonComponents.HamBurger navigationProps={navigation} />
      ),
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'none',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      headerBackImage: () => <CommonComponents.HeaderBackButton />,
    }),
  },
});

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    HomeScreen: {
      screen: BottomTabScreen,
    },
    payitforward: {
      screen: Payment_StackNavigator,
    },
    LiveScreen: {
      screen: LiveStreaming,
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CommonComponents.CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
    drawerPosition: 'right',
  },
);

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.SplashScreen,
  AuthScreen: AuthNavigator,
  ResetPassword: {
    screen: AuthScreens.ResetPassword,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: Register_StackNavigator,
  },

  Drawer: DrawerNavigator,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
