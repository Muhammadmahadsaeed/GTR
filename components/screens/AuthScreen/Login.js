import React, {useEffect, useState} from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {userObject} from '../../Redux/Action/action';
import {bindActionCreators} from 'redux';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
      email: '',
      pwd: '',
      isErorr: false,
      isloading: false,
      wrong: false,
      correct: false,
      showInvalidErorr: false,
      showEmailEmptyErorr: false,
      showPasswordEmptyErorr: false,
      erorrFromServer: '',
    };
  }

  validate = (text) => {
    const userEmail = text.toLowerCase();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userEmail) === false) {
      this.setState({correct: false});
      this.setState({wrong: true});
      this.setState({showEmailEmptyErorr: false});
      return false;
    } else {
      this.setState({correct: true});
      this.setState({wrong: false});
      this.setState({showEmailEmptyErorr: false});
      this.setState({email: userEmail});
    }
  };
  moveToSignup() {
    this.props.navigation.navigate('RegisterScreen');
  }
  setPasswordVisibale() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  moveToHome() {
    this.setState({isloading: true});
    const {email, pwd} = this.state;

    if (email === '' && pwd === '') {
      this.setState({
        showEmailEmptyErorr: true,
        showPasswordEmptyErorr: true,
        correct: false,
        wrong: false,
      });
    } else if (email === '') {
      this.setState({showEmailEmptyErorr: true, correct: false, wrong: false});
    } else if (pwd === '') {
      this.setState({showPasswordEmptyErorr: true});
    } else {
      let formdata = new FormData();

      formdata.append('email', email.toLowerCase());
      formdata.append('password', pwd);
      fetch('https://app.guessthatreceipt.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code == 422) {
            this.setState({isloading: false, showInvalidErorr: true});
          } else {
            
            let checkUserOnline = new FormData();
            checkUserOnline.append('status', 'on');
            fetch('https://app.guessthatreceipt.com/api/userOnOff', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${data.data.access_token}`,
              },
              body: checkUserOnline,
            })
              .then((response) => response.json())
              .then((res) => {
                this.props.store_user(data.data);
                this.props.navigation.navigate('Drawer');
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          this.setState({isloading: false, showInvalidErorr: true});
        });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg.png')}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          style={{flex: 1}}>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Image
              source={require('../../../assets/Logo.png')}
              style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View>
          <KeyboardAvoidingView enabled>
            {this.state.showInvalidErorr && (
              <View style={styles.showInvalidText}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../assets/LargeInvalidIcon.png')}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    paddingLeft: 20,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-Regular_0',
                    }}>
                    Your Email and Password has
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Montserrat-Regular_0',
                    }}>
                    been incorrect
                  </Text>
                </View>
              </View>
            )}
            <View style={[styles.SectionStyle, {marginTop: 20}]}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter ID"
                placeholderTextColor="#F6F6F7"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(text) => this.validate(text)}
                onFocus={() =>
                  this.setState({
                    isloading: false,
                    showEmailEmptyErorr: false,
                    showInvalidErorr: false,
                  })
                }
              />
              <View style={styles.touchableButton} activeOpacity={0.8}>
                {this.state.wrong && (
                  <Image
                    source={require('../../../assets/wrong.png')}
                    style={styles.buttonImage}
                  />
                )}
                {this.state.correct && (
                  <Image
                    source={require('../../../assets/correct.png')}
                    style={styles.buttonImage}
                  />
                )}
                {this.state.showEmailEmptyErorr && (
                  <Image
                    style={{height: 25, width: 25}}
                    source={require('../../../assets/invalidIcon.png')}
                  />
                )}
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                placeholderTextColor="#F6F6F7"
                secureTextEntry={this.state.hidePassword}
                returnKeyType="next"
                onChangeText={(pwd) => this.setState({pwd: pwd})}
                onFocus={() =>
                  this.setState({
                    isloading: false,
                    showPasswordEmptyErorr: false,
                    showInvalidErorr: false,
                  })
                }
              />

              <View style={[styles.touchableButton]}>
                {this.state.showPasswordEmptyErorr ? (
                  <Image
                    style={{height: 25, width: 25}}
                    source={require('../../../assets/invalidIcon.png')}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 3,
                      height: 45,
                      width: 35,
                      justifyContent: 'center',
                      padding: 4,
                      alignItems: 'center',
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      this.setPasswordVisibale();
                    }}>
                    <Image
                      source={
                        this.state.hidePassword
                          ? require('../../../assets/hide.png')
                          : require('../../../assets/view.png')
                      }
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}>
              <Image
                source={require('../../../assets/lockIcon.png')}
                style={{height: 17, width: 13, resizeMode: 'cover'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-Bold_0',
                  marginLeft: 5,
                }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.moveToHome();
              }}
              style={[styles.buttonStyle, {marginTop: 50}]}
              activeOpacity={0.5}>
              {this.state.isloading ? (
                <ActivityIndicator size="large" color="#81b840" />
              ) : (
                <Text style={styles.buttonTextStyle}>Sign in</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.SignUpbuttonStyle]}
              activeOpacity={0.5}
              onPress={() => {
                this.moveToSignup();
              }}>
              <Text
                style={[
                  styles.buttonTextStyle,
                  {paddingTop: 25, color: 'white'},
                ]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
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
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    width: '70%',
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignSelf: 'center',
  },
  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
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
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  SignUpbuttonStyle: {
    width: 80,
    color: 'white',
    borderColor: '#7DE24E',
    height: 80,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular_0',
  },
  buttonTextStyle: {
    color: '#81b840',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold_0',
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    fontFamily: 'Montserrat-Regular_0',
    backgroundColor: '#a1ca70',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },

  showInvalidText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  forgotPassword: {
    // marginTop:10,
    flexDirection: 'row',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 15,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    store_user: (user) => dispatch(userObject(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
