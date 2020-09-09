import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';

export default class Premium extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  moveToUserList() {
    this.props.navigation.navigate('Second');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.paymentContainer}>
          <View style={styles.paymentText}>
            <Text
              style={{
                color: '#81b840',
                fontSize: 20,
                fontFamily: 'Montserrat-Bold_0',
              }}>
              Become a premium
            </Text>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Regular_0',
                }}>
                Get access to financia estimates
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Regular_0',
                }}>
                and GTR platform with Premium Subscribtion
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>Month</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.rupee}>$2.99</Text>
                  <Text style={styles.monthYear}> /Monthly</Text>
                </View>
                <Text style={styles.description}>
                  Recurring monthly billing.
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButton}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular_0',
                      fontSize: 15,
                      color: 'white',
                    }}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>Yearly</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.rupee}>$35.88</Text>
                  <Text style={styles.monthYear}> /Yearly</Text>
                </View>

                <Text style={styles.description}>Billed yearly</Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButton}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular_0',
                      fontSize: 15,
                      color: 'white',
                    }}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>Month</Text>

                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/star.png')}
                    style={{height: 30, width: 30}}
                  />
                  <Text style={styles.rupee}>Free</Text>
                  <Text style={styles.monthYear}> /Weekly</Text>
                </View>
                <Text style={styles.description}>7-days free trial</Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButtonWithStar}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Image
                    style={{height: 15, width: 18}}
                    source={require('../../../assets/star.png')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular_0',
                      fontSize: 15,
                      color: 'white',
                      paddingLeft: 5,
                    }}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.restore}>Restore Perchase</Text>
              <View style={{flexDirection: 'row', marginTop: 25}}>
                <Text style={styles.termText}>Term of use</Text>
                <Text style={styles.policyText}>Privacy policy</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.para}>
                  If you are starting a new app or learning for the first time
                  you should follow V5 steps to create React Navigation Drawer
                  but if you are still developing the application using React
                  Navigation
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular_0',
                    color: '#81b840',
                    fontSize: 18,
                    marginTop: 20,
                  }}>
                  Pay it forward account
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  paymentButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 30,
  },
  paymentButtonText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  paymentText: {
    marginTop: 10,
    alignItems: 'center',
  },
  notificationBox: {
    
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  month: {
    color: 'gray',
    fontFamily: 'Montserrat-Regular_0',
  },
  rupee: {
    color: '#81b840',
    fontSize: 30,
    fontFamily: 'Montserrat-Bold_0',
  },
  description: {
    color: 'gray',
    fontFamily: 'Montserrat-Regular_0',
  },
  buttonView: {
    justifyContent: 'center',
  },
  subscriberButton: {
    backgroundColor: '#81b840',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 50,
    flexDirection: 'row',

    alignItems: 'center',
  },
  subscriberButtonWithStar: {
    backgroundColor: '#81b840',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 50,
    flexDirection: 'row',

    alignItems: 'center',
  },
  monthYear: {
    color: '#81b840',
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Regular_0',
    color: 'gray',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  restore: {
    color: 'gray',
    fontFamily: 'Montserrat-Bold_0',
    fontSize: 17,
  },
  termText: {
    paddingRight: 27,
    fontFamily: 'Montserrat-Bold_0',
  },
  policyText: {
    paddingLeft: 27,
    fontFamily: 'Montserrat-Bold_0',
  },
  para: {
    marginTop: 30,
    fontFamily: 'Montserrat-Regular_0',
  },
});
