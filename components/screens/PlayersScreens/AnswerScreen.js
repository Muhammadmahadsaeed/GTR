import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  Animated,
  Platform,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import FailedModalView from './FailedModal';
import PassedModalView from './PassedModal';
const height = Dimensions.get('window').height;

class AnswerScreen extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
      isloading: false,
      flashMessage: false,
      saveAnswer: false,
      emptyText: false,
      onAnswerSubmit: false,
      startTimer: true
    };
    this.faildModal = React.createRef();
    this.passedModal = React.createRef();
  }

  submitAnswer() {
    this.setState({isloading: true,startTimer:false});
    if (this.state.answer == '') {
      this.setState({emptyText: true,isloading: false});
    } else {
      let formData = new FormData();
      const schedule = this.props.navigation.getParam('schedule');
      formData.append('answer', this.state.answer);
      formData.append('schedule_id', schedule.data.id);
      fetch('https://app.guessthatreceipt.com/api/gameSaveAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.props.user.user.user.access_token}`,
        },
        body: formData,
      })
        .then((result) => result.json())
        .then((res) => {
          fetch('https://app.guessthatreceipt.com/api/getSingleUserRewards', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.props.user.user.user.access_token}`,
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((result) => {
              this.setState({isloading: false});
              console.log(result)
              // if(result.data.length){
              //  this.setPassedModalVisible()
              // }
              // else{
              //   this.setModalVisible()
              // }
              
            })
            .catch((error) => console.log('error', error));
        })
        .catch((error) => console.log('error', error));
    }
  }
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  onTimeFinished(){
    this.setModalVisible()
  }
  setModalVisible() {
    this.faildModal.show();
  }
  setPassedModalVisible() {
    this.passedModal.show();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.counter}>
            <CountdownCircleTimer
              isPlaying={this.state.startTimer}
              duration={10}
              size={100}
              colors={[
                ['#004777', 0.4],
                ['#F7B801', 0.4],
                ['#A30000', 0.2],
              ]}
              onComplete={() => {
                this.onTimeFinished()
              }}>
              {({remainingTime, animatedColor}) => (
                <Animated.Text
                  style={{...styles.remainingTime, color: animatedColor}}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </View>
          <View style={styles.seperator}></View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}>
            <View style={styles.answerView}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.heading}>Guess that receipt</Text>
              </View>
              <View
                style={{
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                }}>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="$ 00.00"
                    placeholderTextColor="#81b840"
                    keyboardType="numeric"
                    onChangeText={(e) => this.setState({answer: e})}
                    onFocus={() =>
                      this.setState({emptyText: false, isloading: false})
                    }
                  />
                </View>
                {this.state.emptyText ? (
                  <View style={{paddingVertical: 5}}>
                    <Text style={styles.erorrText}>Please fill it</Text>
                  </View>
                ) : null}
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.submitAnswer();
                  }}
                  style={styles.buttonStyle}
                  activeOpacity={0.8}>
                  {this.state.isloading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text style={styles.buttonTextStyle}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <FailedModalView ref={(target) => (this.faildModal = target)} {...this.props} />
        <PassedModalView ref={(target) => (this.passedModal = target)} {...this.props} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
  container: {
    flex: 1,
  },
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingTime: {
    fontSize: 46,
  },
  seperator: {height: 50},
  heading: {
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
    fontSize: 25,
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    flex: 1,
    color: '#81b840',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 2,
    borderColor: '#81b840',
    fontFamily: 'Montserrat-Regular_0',
    textAlign: 'center',
  },
  answerView: {
    // marginTop: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 8,
    width: '95%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height - 375,
    paddingVertical: 10,
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

  erorrText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular_0',
    color: 'red',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps, null)(AnswerScreen);
