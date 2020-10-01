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
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
export default class PayItForwardScreen extends Component {
  state = {
    showModal: false,
    status: 'Pending',
    loading: false,
  };
  handleResponse = (data) => {
    console.log('data==========', data);
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  moveToUserList() {
    this.setState({showModal: true});
    // this.setState({loading: true});
    // setTimeout(() => {
      // this.stopLoading();
    // }, 3000);
    // this.props.navigation.navigate('RedirectToPaypalScreen',{showModal: true});
  }
  stopLoading() {
    this.setState({loading: false});
    this.setState({showModal: true});
  }
  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.loading && (
          <ActivityIndicator
            color="#81b840"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
        )} */}
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

        <ScrollView
          style={this.state.loading ? styles.stylOld : styles.styleNew}>
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
                <Text style={styles.month}>2 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$23.92</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
                <Text style={styles.description}>
                  Pay it forward pays for 8 other gamer
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
                <Text style={styles.month}>3 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$35.88</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
                <Text style={styles.description}>
                  Pay it forward pays for 12 other gamer
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
                <Text style={styles.month}>4 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$47.84</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
                <Text style={styles.description}>
                  Pay it forward pays for 16 other gamer
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
                <Text style={styles.month}>5 Monthly</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$59.80</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
                <Text style={styles.description}>
                  Pay it forward pays for 20 other gamer
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
                <Text style={styles.month}>1 Year</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rupee}>$119.60</Text>
                  <Text style={styles.monthYear}> Free</Text>
                </View>
                <Text style={styles.description}>
                  Pay it forward pays for 40 other gamer
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

        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            source={{uri: 'http://app.guessthatreceipt.com/pay'}}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            injectedJavaScript={`document.f1.submit()`}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        </Modal>
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
  stylOld: {
    opacity: 0.2,
  },
  styleNew: {
    flex: 1,
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
