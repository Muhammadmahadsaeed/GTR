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

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword : '',
      hidePassword: true,
      hideConfirmPassword : true
    };
  }
  setPasswordVisibale(){
    
    this.setState({hidePassword : !this.state.hidePassword})
  }
  setConfirmPasswordVisibale(){
    
    this.setState({hideConfirmPassword : !this.state.hideConfirmPassword})
  }
  moveToSignin() {
    this.props.navigation.navigate('Login');
  }
  moveToChooseImage() {
    this.props.navigation.navigate('Second');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView enabled>
            <View style={[styles.SectionStyle, {marginTop: 50}]}>
              <TextInput
                style={styles.inputStyle}
                placeholder="First Name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Last Name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email"
                placeholderTextColor="#F6F6F7"
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Phone Number"
                placeholderTextColor="#F6F6F7"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                placeholderTextColor="#F6F6F7"
                secureTextEntry={this.state.hidePassword}
                returnKeyType="next"
                onChangeText={(e) => this.setState({password : e})}
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
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                placeholderTextColor="#F6F6F7"
                secureTextEntry={this.state.hideConfirmPassword}
                returnKeyType="next"
                onChangeText={(e) => this.setState({confirmPassword : e})}
              />
              <TouchableOpacity
                style={styles.touchableButton}
                activeOpacity={0.8}
                onPress={() => {
                  this.setConfirmPasswordVisibale()
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
            <TouchableOpacity
              style={[styles.buttonStyle,{marginTop:10}]}
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
      </View>
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
    backgroundColor:'#a1ca70'
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
});
