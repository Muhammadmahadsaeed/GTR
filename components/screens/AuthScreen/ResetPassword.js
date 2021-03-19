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
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
      hideConfirmPassword: true,
      showPasswordNotMatch: false,
      passwordConfirmed: false,
      confirmPassword: '',
      password: '',
      pwdErorr: false,
      cPwdErorr: false,
      codeErorr: false,
      isSuccess: false,
      code: '',
      isloading: false,
    };
  }

  moveToLoginScreen() {
    this.setState({isloading: true});
    const {password, confirmPassword, code} = this.state;
    if (code == '' && password == '' && confirmPassword == '') {
      this.setState({pwdErorr: true, cPwdErorr: true, codeErorr: true});
    } else if (password === '') {
      this.setState({pwdErorr: true});
    } else if (code == '') {
      this.setState({codeErorr: true});
    } else if (confirmPassword == '') {
      this.setState({cPwdErorr: true});
    } else {
      fetch(
        `https://app.guessthatreceipt.com/api/updatePassword?code=${code}&password=${password}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status) {
            this.setState({isloading: false, isSuccess: true});
          
          } else {
            this.setState({isloading: false});
          }
        })
        .catch((error) => {
          this.setState({isloading: false});
          console.log('error', error);
        });
    }
    
  }
  setPasswordVisibale() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  setConfirmPasswordVisibale() {
    this.setState({hideConfirmPassword: !this.state.hideConfirmPassword});
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
    if (this.state.isSuccess) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#81b840',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/success.png')}
            style={{
              height: 150,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text style={styles.successTextStyle}>
            Password Update Successful
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.9}
            onPress={() => this.props.navigation.navigate('AuthScreen')}>
            <Text style={styles.buttonTextStyle}>Login Now</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Image
              source={require('../../../assets/resetpassword.png')}
              style={{
                width: 180,
                height: 180,
                borderRadius: 100,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={styles.forgortPasswordText}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Bold_0',
                color: '#81b840',
              }}>
              Reset Your Password
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: '#a1a1a1',
                fontFamily: 'Montserrat-Regular_0',
              }}>
              We have sent a four digit code on your
            </Text>
            <Text
              style={{color: '#a1a1a1', fontFamily: 'Montserrat-Regular_0'}}>
              phone/email
            </Text>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Four digit code"
                placeholderTextColor="#81b840"
                returnKeyType="next"
                onFocus={() =>
                  this.setState({codeErorr: false, isloading: false})
                }
                onChangeText={(e) => this.setState({code: e})}
              />
              {this.state.codeErorr && (
                <View style={styles.touchableButton}>
                  <Image
                    style={{height: 25, width: 25}}
                    source={require('../../../assets/invalidIcon.png')}
                  />
                </View>
              )}
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="New Password"
                placeholderTextColor="#81b840"
                secureTextEntry={this.state.hidePassword}
                onChangeText={(e) => this.setState({password: e})}
                returnKeyType="next"
                onFocus={() =>
                  this.setState({pwdErorr: false, isloading: false})
                }
              />
              <View style={[styles.touchableButton]}>
                {this.state.pwdErorr ? (
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
                          ? require('../../../assets/greenhide.png')
                          : require('../../../assets/greenview.png')
                      }
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                placeholderTextColor="#81b840"
                onChangeText={(e) => this.checkPassword(e)}
                secureTextEntry={this.state.hideConfirmPassword}
                returnKeyType="next"
                onFocus={() =>
                  this.setState({cPwdErorr: false, isloading: false})
                }
              />
              <View style={[styles.touchableButton]}>
                {this.state.cPwdErorr ? (
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
                      this.setConfirmPasswordVisibale();
                    }}>
                    <Image
                      source={
                        this.state.hideConfirmPassword
                          ? require('../../../assets/greenhide.png')
                          : require('../../../assets/greenview.png')
                      }
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {this.state.passwordConfirmed && (
              <View style={styles.showPasswordNotMatch}>
                <Text
                  style={{
                    color: '#81b840',
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
              onPress={() => {
                this.moveToLoginScreen();
              }}
              style={styles.buttonStyle}
              activeOpacity={0.9}>
              {this.state.isloading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonTextStyle}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
export default ResetPassword;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  forgortPasswordText: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
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
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    width: '70%',
    // marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignSelf: 'center',
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
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 10,
  },

  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold_0',
  },
  inputStyle: {
    flex: 1,
    color: '#81b840',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#81b840',
    fontFamily: 'Montserrat-Regular_0',
    backgroundColor: '#d7e5c3',
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
