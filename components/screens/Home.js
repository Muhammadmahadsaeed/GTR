import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import {strTime, setCurrentDate} from './CommonComponents/DateTime';
// import firebase from 'react-native-firebase';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      flashMessage: false,
      package: '',
    };
  }

  componentDidMount() {
    // this.checkPermission();
    // this.createChannel();
    // this.notificationListener();
    this.getPackage();
  }
  async getPackage() {
    await fetch('https://app.guessthatreceipt.com/api/getUserCurrentPackage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.props.user.user.user.access_token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({package: result.data});
      })
      .catch((error) => console.log('error', error));
  }
  // async getToken() {
  //   const firebaseToken = await firebase.messaging().getToken();
  
  //   if (firebaseToken) {
  //     firebase.messaging().subscribeToTopic('topic');
  //   }
  // }

  // async checkPermission() {
  //   const permission = await firebase.messaging().hasPermission();
  //   if (permission) {
  //     this.getToken();
  //   } else {
  //     console.log('nh h====');
  //   }
  // }
  // create channel
  // createChannel = () => {
  //   const channel = new firebase.notifications.Android.Channel(
  //     'channelId',
  //     'channelName',
  //     firebase.notifications.Android.Importance.Max,
  //   ).setDescription('Description');
  //   firebase.notifications().android.createChannel(channel);
  // };
  //foreground notification
  // notificationListener = () => {
  //   firebase.notifications().onNotification((notification) => {
  //     // if(Platform.OS == 'android'){
  //     const localNotification = new firebase.notifications.Notification({
  //       sound: 'default',
  //       show_in_foreground: true,
  //     })
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification.title)
  //       .setSubtitle(notification.subtitle)
  //       .setBody(notification.body)
  //       .setData(notification.data)
        
  //       .android.setChannelId('channelId')
  //       .android.setPriority(firebase.notifications.Android.Priority.High);

  //     firebase
  //       .notifications()
  //       .displayNotification(localNotification)
  //       .catch((err) => console.log(err));
  //     // }
  //   });
  // };
  checkPackage() {
    // fetch('https://app.guessthatreceipt.com/api/getUserCurrentPackage', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${this.props.user.user.user.access_token}`,
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result.data)
    //     if(result.data === "Unauthenticated."){
    //       console.log("bhkari h sala")

    //        this.setState({flashMessage: true}, () => {
    //         setTimeout(() => this.closeFlashMessage(), 3000);
    //       });
    //     }
    //     else{
    this.props.navigation.navigate('DailyChallenges');
    //   }
    // })
    // .catch((error) => console.log('error', error));
  }
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  render() {
    
    return (
      <SafeAreaView style={styles.MainContainer} forceInset={{top: 'always'}}>
        <View style={{flex: 1}}>
          <ScrollView style={[styles.body, {flex: 1}]}>
            <View style={styles.challengeView}>
              <View>
                <Text style={styles.challengeViewHeading}>DAILY CHALLENGE</Text>
                <Text style={styles.challengeViewPara}>
                  Lorum ipsum about react
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.checkPackage();
                  }}>
                  <Text style={styles.challengeViewTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxes}>
              <View
                style={[
                  styles.bigBox,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text
                  style={{
                    fontSize: 50,
                    fontFamily: 'Montserrat-ExtraBold',
                    color: 'white',
                  }}>
                  GTR
                </Text>
              </View>
              <View style={[styles.smallBox, {justifyContent: 'center'}]}>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                    Date
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: 'white',
                    }}>
                    {setCurrentDate}
                  </Text>
                </View>
                <View style={{marginTop: 15, marginLeft: 15}}>
                  <Text
                    style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                    Time
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: 'white',
                    }}>
                    {strTime}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.challengeView}>
              <View>
                <Text style={styles.challengeViewHeading}>
                  WINNERS OF THE DAY
                </Text>
                <Text style={styles.challengeViewPara}>
                  Lorum ipsum about react
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Text style={styles.challengeViewTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxes}>
              <View
                style={[
                  styles.smallBox,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Image
                  source={require('../../assets/cupIcon.png')}
                  style={styles.userIcon}
                />
              </View>
              <View style={[styles.bigBox, {padding: 10}]}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      borderColor: 'white',
                      borderWidth: 2,
                    }}>
                    <Image
                      source={require('../../assets/dummy.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 5, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                      }}>
                      Ertugal Gazi
                    </Text>
                    <Text style={[styles.challengeViewPara, {color: 'white'}]}>
                      lorum about react
                    </Text>
                  </View>
                </View>
                <View style={styles.seperator}></View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      borderColor: 'white',
                      borderWidth: 2,
                    }}>
                    <Image
                      source={require('../../assets/dummy.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 5, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                      }}>
                      Ertugal Gazi
                    </Text>
                    <Text style={[styles.challengeViewPara, {color: 'white'}]}>
                      lorum about react
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.challengeView}>
              <View>
                <Text style={styles.challengeViewHeading}>PAY IT FORWORD</Text>
                <Text style={styles.challengeViewPara}>
                  Lorum ipsum about react
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Text style={styles.challengeViewTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxes}>
              <View
                style={[
                  styles.payItSmallBox,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Image
                  source={require('../../assets/shopIcon.png')}
                  style={styles.shopIcon}
                />
              </View>
              <View style={[styles.payItBigBox, {padding: 10}]}>
                <View style={styles.notificationBox}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.month}>Active</Text>
                    <View style={{flexDirection: 'row'}}>
                      {this.state.package ? (
                        <Text style={styles.rupee}>
                          {this.state.package.amount}
                        </Text>
                      ) : (
                        <Text style={styles.rupee}>$11.96</Text>
                      )}
                    </View>
                    {this.state.package ? (
                      <Text style={styles.description}>
                        {this.state.package.exp_date}
                      </Text>
                    ) : (
                      <Text style={styles.description}>
                        Expiry: 28-sep-2020
                      </Text>
                    )}
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.subscriberButton}
                      onPress={() => {
                        this.moveToUserList();
                      }}>
                      <Image
                        style={{height: 15, width: 18}}
                        source={require('../../assets/heart.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {this.state.flashMessage ? (
            <View style={styles.flashMessage}>
              <Text
                style={{color: 'white', fontFamily: 'Montserrat-Regular'}}>
                Phle paisa do
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  body: {
    marginTop: 20,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  challengeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  challengeViewHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#81b840',
  },
  challengeViewPara: {
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
    fontSize: 12,
  },
  challengeViewTextView: {
    fontFamily: 'Montserrat-Bold',
    color: '#81b840',
  },
  boxes: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  bigBox: {
    // height: 150,
    width: '66%',
    backgroundColor: '#81b840',
    borderRadius: 15,
    justifyContent: 'center',
  },
  smallBox: {
    height: 150,
    width: '32%',
    backgroundColor: '#81b840',
    borderRadius: 15,
  },
  payItBigBox: {
    // height: 150,
    width: '66%',
    backgroundColor: '#81b840',
    borderRadius: 15,
    justifyContent: 'center',
  },
  payItSmallBox: {
    height: 100,
    width: '32%',
    backgroundColor: '#81b840',
    borderRadius: 15,
  },
  userIcon: {
    height: 85,
    width: 70,
  },
  shopIcon: {
    height: 60,
    width: 65,
  },
  notificationBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  month: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  rupee: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  buttonView: {
    justifyContent: 'center',
  },
  subscriberButton: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthYear: {
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  seperator: {
    height: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  flashMessage: {
    position: 'absolute',
    backgroundColor: '#81b840',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
export default connect(mapStateToProps, null)(Home);
