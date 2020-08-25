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

export default class PaymentScreen extends Component {
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
          <View style={styles.paymentButton}>
            <Text style={[styles.paymentButtonText, {paddingRight: 20,fontFamily:'Montserrat-Regular_0'}]}>
              Premium
            </Text>
            <Text
              style={[
                styles.paymentButtonText,
                {
                  paddingLeft: 15,
                  paddingRight: 30,
                  color: 'white',
                  backgroundColor: 'green',
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  fontFamily:'Montserrat-Regular_0'
                },
              ]}>
              Pay it forward
            </Text>
          </View>
          <View style={styles.paymentText}>
            <Text style={{color: '#81b840', fontSize: 20, fontFamily:"Montserrat-Bold_0"}}>
              Pay it forward{' '}
            </Text>
            <View style={{marginTop: 10}}>
              <Text style={{textAlign: 'center',fontFamily:'Montserrat-Regular_0'}}>
                Get access to financia estimates
              </Text>
              <Text style={{textAlign: 'center',fontFamily:'Montserrat-Regular_0'}}>
                and GTR platform with Premium Subscribtion
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Month</Text>
                <Text style={styles.rupee}>$11.96</Text>
                <Text style={styles.description}>
                  Pay it forward pays for 4 other gamer
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButton}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('../../../assets/heart.png')}
                  />
                  <Text style={{fontSize: 15, color: 'white', paddingLeft: 5}}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Month</Text>
                <Text style={styles.rupee}>$11.96</Text>
                <Text style={styles.description}>
                  Pay it forward pays for 4 other gamer
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButton}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('../../../assets/heart.png')}
                  />
                  <Text style={{fontSize: 15, color: 'white', paddingLeft: 5}}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Month</Text>
                <Text style={styles.rupee}>$11.96</Text>
                <Text style={styles.description}>
                  Pay it forward pays for 4 other gamer
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButton}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('../../../assets/heart.png')}
                  />
                  <Text style={{fontSize: 15, color: 'white', paddingLeft: 5}}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Month</Text>
                <Text style={styles.rupee}>$11.96</Text>
                <Text style={styles.description}>
                  Pay it forward pays for 4 other gamer
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.subscriberButton}
                  onPress={() => {
                    this.moveToUserList();
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('../../../assets/heart.png')}
                  />
                  <Text style={{fontSize: 15, color: 'white', paddingLeft: 5,fontFamily:'Montserrat-Regular_0'}}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
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
    marginTop: 10,
    height: '28%',
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
    marginTop: 20,
    alignItems: 'center',
  },
  notificationBox: {
    flex: 1,
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
    fontFamily:'Montserrat-Regular_0'
  },
  rupee: {
    color: '#81b840',
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily:"Montserrat-Bold_0"
  },
  description: {
    color: 'gray',
    fontFamily:'Montserrat-Regular_0'
  },
  buttonView: {
    justifyContent: 'center',
  },
  subscriberButton: {
    backgroundColor: 'green',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 50,
    flexDirection: 'row',

    alignItems: 'center',
  },
});
