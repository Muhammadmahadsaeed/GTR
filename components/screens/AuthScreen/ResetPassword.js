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

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
    };
  }

  moveToLoginScreen() {
    this.props.navigation.navigate('Login');
  }
  setPasswordVisibale() {
    this.setState({hidePassword: !this.state.hidePassword});
  }
  render() {
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
            <Text style={{fontSize: 20,fontFamily:'Montserrat-Bold_0', color: '#81b840'}}>
              Reset Your Password
            </Text>
            <Text style={{marginTop: 5, color: '#a1a1a1',fontFamily:'Montserrat-Regular_0'}}>
              We have sent a four digit code on your
            </Text>
            <Text style={{color: '#a1a1a1',fontFamily:'Montserrat-Regular_0'}}>phone/email</Text>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Four digit code"
                placeholderTextColor="#81b840"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="New Password"
                placeholderTextColor="#81b840"
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
                      ? require('../../../assets/greenhide.png')
                      : require('../../../assets/greenview.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                placeholderTextColor="#81b840"
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
                      ? require('../../../assets/greenhide.png')
                      : require('../../../assets/greenview.png')
                  }
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.moveToLoginScreen();
              }}
              style={styles.buttonStyle}
              activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Reset Password</Text>
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
    marginTop:10
    
  },

  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily:'Montserrat-Bold_0'
  },
  inputStyle: {
    flex: 1,
    color: '#81b840',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#81b840',
    fontFamily:'Montserrat-Regular_0',
    backgroundColor:'#d7e5c3'
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
