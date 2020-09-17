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
  Modal,
  WebView,
} from 'react-native';

export default class PayItForwardScreen extends Component {
  state = {
    showModal: false,
    status: 'Pending',
  };
  handleResponse = (data) => {
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  moveToUserList() {
    this.props.navigation.navigate('Second');
    // this.setState({showModal: true});
    // return (
    //   <Modal
    //     visible={this.state.showModal}
    //     onRequestClose={() => this.setState({showModal: false})}>
    //     <WebView
    //       source={{uri: 'http://app.guessthatreceipt.com/pay'}}
    //       onNavigationStateChange={(data) => this.handleResponse(data)}
    //       injectedJavaScript={`document.f1.submit()`}
    //     />
    //   </Modal>
    // );
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
              Pay it forward{' '}
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
                <Text style={styles.month}>1 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$11.96</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>

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
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$11.96</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
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
                    style={{height: 15, width: 18}}
                    source={require('../../../assets/heart.png')}
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
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$11.96</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
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
            <View style={styles.notificationBox}>
              <View style={{flex: 1}}>
                <Text style={styles.month}>1 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$11.96</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
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
    fontFamily: 'Montserrat-Regular_0',
  },
  rupee: {
    color: '#81b840',
    fontSize: 30,
    // fontWeight: 'bold',
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
    paddingTop: 8,
    paddingBottom: 8,
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
});
