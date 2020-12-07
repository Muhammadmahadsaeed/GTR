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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import RNPaypal from 'react-native-paypal-lib';
export default class Premium extends Component {
  constructor(props) {
    super();
    this.state = {getPremium: ''};
  }
  async componentDidMount() {
    await fetch(
      'https://app.guessthatreceipt.com/api/subscriptions?type=premium',
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({getPremium: result.data});
      })
      .catch((error) => console.log('error', error));
  }

  moveToUserList(val, month) {
    RNPaypal.paymentRequest({
      clientId:
        'AekbL8qYWEn-d3_lYH13EyyZonOrBSM_E94YzIUmMfZm-hsiC4KPzt3-wLjDRlnqVblzUqBG6Xjv0RJp',
      environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
      intent: RNPaypal.INTENT.SALE,
      price: val,
      currency: 'USD',
      description: month,
      acceptCreditCards: true,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
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

        <View style={{width: '95%', alignSelf: 'center', flex: 1}}>
          {!this.state.getPremium ? (
            <View style={styles.ActivityIndicatorStyle}>
              <ActivityIndicator color="#009688" size="large" />
            </View>
          ) : (
            <FlatList
              data={this.state.getPremium}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.notificationBox}>
                  <View style={{flex: 1}}>
                    <Text style={styles.month}>
                      {item.period_type.charAt(0).toUpperCase() +
                        item.period_type.slice(1)}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.rupee}>${item.price}</Text>
                      <Text style={styles.monthYear}> Free</Text>
                    </View>

                    <Text style={styles.description}>
                      Pay it forward pays for 4 other gamer
                    </Text>
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.subscriberButton}>
                      <Image
                        style={{height: 15, width: 18}}
                        source={require('../../../assets/heart.png')}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          paddingLeft: 5,
                          fontFamily: 'Montserrat-Regular_0',
                        }}>
                        Subscribe
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>
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
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
