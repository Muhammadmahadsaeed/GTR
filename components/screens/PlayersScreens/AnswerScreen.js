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
} from 'react-native';
import {connect} from 'react-redux';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
const height = Dimensions.get('window').height;
class AnswerScreen extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
      isloading: false,
      flashMessage: false,
      saveAnswer: false,
    };
  }

  submitAnswer() {
    this.setState({isloading: true});
    if (this.state.answer == '') {
      this.setState({isloading: false, flashMessage: true}, () => {
        setTimeout(() => this.closeFlashMessage(), 3000);
      });
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
          this.setState({isloading: false})
          // this.setState({isloading: false, saveAnswer: true}, () => {
          //   setTimeout(() => this.closeFlashMessage(), 3000);
          // });
        })
        .catch((error) => console.log('error', error));
    }
  }
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
     
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView enabled>
            <View style={styles.counter}>
              <CountdownCircleTimer
                isPlaying
                duration={10}
                size={100}
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
                onComplete={() => {
                  console.log('ON_COMPLETE BEFORE RETURN');
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
            <View style={styles.answerView}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.heading}>Guess that receipt</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="$ 00.00"
                  placeholderTextColor="#81b840"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onChangeText={(e) => this.setState({answer: e})}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={this.startTimer}
                  // onPress={() => {
                  //   this.submitAnswer();
                  // }}
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
        {this.state.flashMessage == true ? (
          <View style={styles.flashMessage}>
            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular_0'}}>
              Please Fill it
            </Text>
          </View>
        ) : null}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    width: '40%',
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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

export default connect(mapStateToProps, null)(AnswerScreen);
