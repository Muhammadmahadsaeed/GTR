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
  FlatList,
} from 'react-native';
import {WebView} from 'react-native-webview';

import ModalView from './Modal';

export default class PayItForwardScreen extends Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
  }
  state = {
    showModal: false,
    status: 'Pending',
    loading: false,
    getPremium: '',
    amount: 1000,
   
  };

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
    this.setState({showModal: true});
  }
  setModalVisible() {
    this.modalRef.show();
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
                    <TouchableOpacity
                      style={styles.subscriberButton}
                      onPress={() => this.moveToUserList()}>
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

        <ModalView ref={(target) => (this.modalRef = target)} />
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            style={{flex: 1}}
            source={{uri: `http://pombopaypal.guessthatreceipt.com/paypal/${this.state.amount}`}}
            originWhitelist={['*']}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            // injectedJavaScript={`document.getElementById('price').value =${this.state.amount};document.f1.submit()`}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            renderLoading={() => (
              <View style={styles.ActivityIndicatorStyle}>
                <ActivityIndicator color="#009688" size="large" />
              </View>
            )}
           
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

  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
