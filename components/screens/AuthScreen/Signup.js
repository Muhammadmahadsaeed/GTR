import React, {useState} from 'react';

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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pNum: '',
      password: '',
      confirmPassword: '',
      hidePassword: true,
      hideConfirmPassword: true,
      isErorr: false,
      isloading: false,
      wrong: false,
      showPasswordNotMatch: false,
      correct: false,
      passwordConfirmed: false,
      firstNameErorr: false,
      lastNameErorr: false,
      emailErorr: false,
      pNumErorr: false,
      pwdErorr: false,
      cPwdErorr: false,
    };
  }
  validate = (text) => {
    const userEmail = text;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userEmail) === false) {
      this.setState({correct: false});
      this.setState({wrong: true});

      return false;
    } else {
      this.setState({correct: true});
      this.setState({wrong: false});
      this.setState({email: userEmail});
    }
  };
  setPasswordVisibale() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  setConfirmPasswordVisibale() {
    this.setState({hideConfirmPassword: !this.state.hideConfirmPassword});
  }
  moveToSignin() {
    this.props.navigation.navigate('Login');
  }
  moveToChooseImage() {
    const {
      firstName,
      lastName,
      email,
      pNum,
      password,
      confirmPassword,
    } = this.state;
    if (
      firstName === '' &&
      lastName === '' &&
      email === '' &&
      pNum === '' &&
      password === '' &&
      confirmPassword === ''
    ) {
      this.setState({
        firstNameErorr: true,
      });
      this.setState({
        lastNameErorr: true,
      });
      this.setState({
        emailErorr: true,
      });
      this.setState({
        pNumErorr: true,
      });
      this.setState({
        pwdErorr: true,
      });
      this.setState({
        cPwdErorr: true,
      });
    } else if (firstName == '') {
      this.setState({firstNameErorr: true});
    } else if (lastName == '') {
      this.setState({lastNameErorr: true});
    } else if (email == '') {
      this.setState({emailErorr: true});
    } else if (pNum == '') {
      this.setState({pNumErorr: true});
    } else if (password == '') {
      this.setState({pwdErorr: true});
    } else if (confirmPassword == '') {
      this.setState({cPwdErorr: true});
    } else {
      this.props.navigation.navigate('Second', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pNum: pNum,
        password: password,
        confirmPassword: confirmPassword,
      });
    }
  }
  checkPassword(e) {
    const {password} = this.state;
    if (password === e) {
      this.setState({passwordConfirmed: true});
      this.setState({showPasswordNotMatch: false});
      this.setState({confirmPassword: e});
    } else {
      this.setState({showPasswordNotMatch: true});
      this.setState({passwordConfirmed: false});
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}} forceInset={{top:'always'}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.SectionStyle, {marginTop: 50}]}>
              <TextInput
                style={styles.inputStyle}
                placeholder="First Name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="sentences"
                returnKeyType="next"
                onChangeText={(text) => this.setState({firstName: text})}
                onFocus={() => this.setState({firstNameErorr: false})}
              />
            </View>
            {this.state.firstNameErorr && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Please fill the field
                </Text>
              </View>
            )}
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Last Name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="sentences"
                returnKeyType="next"
                onChangeText={(text) => this.setState({lastName: text})}
                onFocus={() => this.setState({lastNameErorr: false})}
              />
            </View>
            {this.state.lastNameErorr && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Please fill the field
                </Text>
              </View>
            )}
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email"
                placeholderTextColor="#F6F6F7"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(text) => this.validate(text)}
                onFocus={() => this.setState({emailErorr: false})}
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
              </View>
            </View>
            {this.state.emailErorr && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Please fill the field
                </Text>
              </View>
            )}
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Phone Number"
                placeholderTextColor="#F6F6F7"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({pNum: text})}
                onFocus={() => this.setState({pNumErorr: false})}
              />
            </View>
            {this.state.pNumErorr && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Please fill the field
                </Text>
              </View>
            )}
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                placeholderTextColor="#F6F6F7"
                secureTextEntry={this.state.hidePassword}
                returnKeyType="next"
                onChangeText={(e) => this.setState({password: e})}
                onFocus={() => this.setState({pwdErorr: false})}
              />
              <TouchableOpacity
                style={styles.touchableButton}
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
            </View>
            {this.state.pwdErorr && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Please fill the field
                </Text>
              </View>
            )}
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                placeholderTextColor="#F6F6F7"
                secureTextEntry={this.state.hideConfirmPassword}
                returnKeyType="next"
                onChangeText={(e) => this.checkPassword(e)}
                onFocus={() => this.setState({cPwdErorr: false})}
              />
              <TouchableOpacity
                style={styles.touchableButton}
                activeOpacity={0.8}
                onPress={() => {
                  this.setConfirmPasswordVisibale();
                }}>
                <Image
                  source={
                    this.state.hideConfirmPassword
                      ? require('../../../assets/hide.png')
                      : require('../../../assets/view.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
            {this.state.cPwdErorr && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Please fill the field
                </Text>
              </View>
            )}
            {this.state.passwordConfirmed && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'green',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Password match
                </Text>
              </View>
            )}
            {this.state.showPasswordNotMatch && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Montserrat-Regular_0',
                  }}>
                  Password does not match
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={[styles.buttonStyle, {marginTop: 10}]}
              activeOpacity={0.5}
              onPress={() => {
                this.moveToChooseImage();
              }}>
              <Text style={styles.buttonTextStyle}>NEXT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.SignUpbuttonStyle]}
              activeOpacity={0.5}
              onPress={() => {
                this.moveToSignin();
              }}>
              <Text
                style={[
                  styles.buttonTextStyle,
                  {paddingTop: 25, color: 'white'},
                ]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default SignupScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    // left: 0,
    // top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    width: '70%',
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignSelf: 'center',
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
    // backgroundColor: '#81b840',
    // borderWidth: 0,
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
  },
  buttonTextStyle: {
    color: '#81b840',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold_0',
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
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
  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
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
  showPasswordNotMatch: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70%',
    marginLeft: 20,
  },
});
