import React from 'react';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const BottomTabNavigation = (props) => {
  const {
    navigationState,
    navigation,
    activeTintColor,
    inactiveTintColor,
  } = props;
  const activeTabIndex = navigation.state.index;
  console.log("===================",props)
  return (
    <View style={styles.paymentButton}>
      {navigationState.routes.map((route, index) => {
        const isRouteActive = index === activeTabIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(route.routeName)}
            key={index}>
            <View>
              <Text
                style={[
                  styles.paymentButtonText,
                  {
                    backgroundColor: `${isRouteActive ? 'green' : 'white'}`,
                    color: `${tintColor}`,
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
  );
};
const styles = StyleSheet.create({
  paymentButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  paymentButtonText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: 'Montserrat-Regular_0',
  },
  paymentText: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default BottomTabNavigation;
