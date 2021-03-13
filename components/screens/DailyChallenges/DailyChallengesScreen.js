import React, {useState} from 'react';
import {connect} from 'react-redux';
//Import all required component
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';

class DailyChallengesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      schedule: false,
      scheduleArray: '',
      isloading: false,
      flashMessage: false,
    };
  }

  componentDidMount() {
    fetch('https://app.guessthatreceipt.com/api/getGameSchedule', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.user.user.user.access_token}`,
      },
    })
      .then((result) => result.json())
      .then((res) => {
        this.setState({scheduleArray: res});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendInivitaion() {
    fetch(
      'http://pombopaypal.guessthatreceipt.com/api/notification/sendToAll',
      {
        method: 'POST',
      },
    )
      .then((response) => console.log('success'))
      .catch((err) => console.log('erorr', err));
    //
  }
  goToLive() {
    this.props.navigation.navigate('LiveScreen');
  }
  moveToHostOrAudienceScreen() {
    const res = this.state.scheduleArray;

    this.setState({isloading: true});
    if (res.data.is_expired === 'active') {
      this.setState({isloading: false});
      const params = new URLSearchParams();
      params.append('schedule_id', `${res.data.id}`);
      fetch('https://app.guessthatreceipt.com/api/gameLiveEntry', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.props.user.user.user.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: params.toString(),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === 'Successfully' || result.message === 'this is previous user so he can join') {
           
            this.props.navigation.navigate('LiveScreen', {
              schedule: res,
            });
          } else {
           
            this.props.navigation.navigate('Audience');
          }
        })
        .catch((error) => console.log('error', error));
    } else {
      this.setState({isloading: false, flashMessage: true}, () => {
        setTimeout(() => this.closeFlashMessage(), 3000);
      });
    }
  }
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  render() {
    const role = this.props.user.user.user.user_details.role_id;
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../assets/Logo.png')}
              style={{
                width: '60%',
                height: 120,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View>
          <KeyboardAvoidingView enabled>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.heading}>Daily</Text>
              <Text style={styles.heading}>Challenge</Text>
              <Text style={[styles.para, {marginTop: 20}]}>
                Guess That Receipt
              </Text>
              <Text style={styles.para}> to win the price of the receipt</Text>
            </View>
            {role == 3 ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.sendInivitaion();
                  }}
                  style={[styles.buttonStyle, {marginTop: 70}]}
                  activeOpacity={0.5}>
                  <Text style={styles.buttonTextStyle}>Send Inivitation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToLive();
                  }}
                  style={[styles.buttonStyle]}
                  activeOpacity={0.5}>
                  <Text style={styles.buttonTextStyle}>Live</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.moveToHostOrAudienceScreen();
                }}
                style={[styles.buttonStyle, {marginTop: 70}]}
                activeOpacity={0.8}>
                {this.state.isloading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text style={styles.buttonTextStyle}>Play</Text>
                )}
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
        {this.state.flashMessage == true ? (
          <View style={styles.flashMessage}>
            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular_0'}}>
              Game will host on monday to friday at 7:00 PM
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  buttonStyle: {
    backgroundColor: '#81b840',
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 50,
    width: '70%',
    alignItems: 'center',
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    // marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },

  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold_0',
  },
  heading: {
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
    fontSize: 35,
  },
  para: {
    fontFamily: 'Montserrat-Regular_0',
    color: '#81b840',
    fontSize: 16,
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

export default connect(mapStateToProps, null)(DailyChallengesScreen);
