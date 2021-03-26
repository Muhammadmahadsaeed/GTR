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
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import ModalView from './Modal';
class Premium extends Component {
  constructor(props) {
    super();
    this.state = {
      getPremium: '',
      amount: 0,
      status: 'Pending',
      showModal: false,
      package: '',
      modalText: '',
    };
  }
  async componentDidMount() {
    await fetch(
      'https://app.guessthatreceipt.com/api/subscriptions?type=premium',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.props.user.user.access_token}`,
        },
      },
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({getPremium: result.data});
      })
      .catch((error) => console.log('error', error));
  }
  handleResponse = (data) => {
    let url = data.url;
    let fields = url.split('?');
    let paymentId = fields[1];
    let formdata = new FormData();

    if (data.title === 'success') {
      formdata.append('pack_id', this.state.package.id);
      formdata.append('transaction_id', paymentId);
      fetch('https://app.guessthatreceipt.com/api/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.props.user.user.access_token}`,
        },
        body: formdata,
      })
        .then((response) => response.json())

        .then((data) => {
          this.setState({showModal: false, status: 'Complete'});
          this.setModalVisible();
        })
        .catch((error) => {
          console.log('====', error);
        });
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  moveToUserList(item) {
    let formdata = new FormData();
    this.setState({package: item});
    if (item.price === '0.00') {
      formdata.append('pack_id', this.state.package.id);
      formdata.append('transaction_id', item.description);
      fetch('https://app.guessthatreceipt.com/api/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.props.user.user.access_token}`,
        },
        body: formdata,
      })
        .then((response) => response.json())

        .then((data) => {
          console.log(data)
          this.setModalVisible();
        })
        .catch((error) => {
          console.log('====', error);
        });
    } else {
      this.setState({
        showModal: true,
        modalText: item.description,
        amount: item.price,
        package: item,
      });
    }
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
                fontFamily: 'Montserrat-Bold',
              }}>
              Become a premium
            </Text>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Get access to financia estimates
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Regular',
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
              showsVerticalScrollIndicator={false}
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
                      onPress={() => this.moveToUserList(item)}>
                      <Image
                        style={{height: 15, width: 18}}
                        source={require('../../../assets/heart.png')}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          paddingLeft: 5,
                          fontFamily: 'Montserrat-Regular',
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
        
        <ModalView
          ref={(target) => (this.modalRef = target)}
          text={this.state.modalText}
        />
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            style={{flex: 1}}
            source={{
              uri: `http://pombopaypal.guessthatreceipt.com/paypal/${this.state.amount}`,
            }}
            originWhitelist={['*']}
            onNavigationStateChange={(data) => this.handleResponse(data)}
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
    fontFamily: 'Montserrat-Regular',
  },
  rupee: {
    color: '#81b840',
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    color: 'gray',
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
  },
  termText: {
    paddingRight: 27,
    fontFamily: 'Montserrat-Bold',
  },
  policyText: {
    paddingLeft: 27,
    fontFamily: 'Montserrat-Bold',
  },
  para: {
    marginTop: 30,
    fontFamily: 'Montserrat-Regular',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Premium);
