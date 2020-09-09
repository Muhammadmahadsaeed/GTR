import React from 'react';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const PaymentTabBar = (props) => {
  const {
    navigationState,
    navigation,
    activeTintColor,
    inactiveTintColor,
   
  } = props;
  const activeTabIndex = navigation.state.index;

  return (
    <View style={styles.paymentContainer}>
     
      <View style={styles.paymentButton}>
        {navigationState.routes.map((route, index) => {
            
          const isRouteActive = index === activeTabIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableWithoutFeedback 
              onPress={() => navigation.navigate(route.routeName)}
              key={index}>
              <View >
                <Text
                  style={[
                    styles.paymentButtonText,
                    {
                    backgroundColor: `${isRouteActive ? '#81b840' : 'white'}`,
                    color:`${tintColor}`,
                    
                },
                  ]}>
                  {' '}
                  {route.routeName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
   
  },
  paymentButton: {
    flexDirection: 'row',
    borderRadius: 50,
    borderBottomRightRadius:50,
    borderTopRightRadius:50,
    marginTop: 20,

  },
  paymentButtonText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight:20,
    paddingLeft:20,
    fontFamily:'Montserrat-Bold_0',

  },
 
});
export default PaymentTabBar;
