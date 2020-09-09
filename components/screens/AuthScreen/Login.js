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
} from 'react-native';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
    };
  }

  moveToSignup() {
    this.props.navigation.navigate('RegisterScreen');
  }
  setPasswordVisibale() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  moveToHome() {
    this.props.navigation.navigate('HomeScreen');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
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
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter ID"
                placeholderTextColor="#F6F6F7"
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                placeholderTextColor="#F6F6F7"
                secureTextEntry={this.state.hidePassword}
                returnKeyType="next"
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
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}>
              <Image
                source={require('../../../assets/lockIcon.png')}
                style={{height: 17, width: 13,resizeMode:'cover'}}
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
              style={[styles.buttonStyle, {marginTop: 100}]}
              activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Sign in</Text>
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
export default LoginScreen;

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
    marginTop: 10,
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
    backgroundColor:'#a1ca70'
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
  forgotPassword: {
    // marginTop:10,
    flexDirection: 'row',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 15,
    justifyContent: 'center',
  },
});
