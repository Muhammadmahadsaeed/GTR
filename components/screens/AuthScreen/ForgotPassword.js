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
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: '',
      isloading: false,
    };
  }

  moveToResetPassword() {
    this.setState({isloading: true});
    fetch(
      `https://app.guessthatreceipt.com/api/forgetPassword?email=${this.state.email}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status) {
          ToastAndroid.show('Please check your email', ToastAndroid.SHORT)
          this.setState({isloading: false});
          this.props.navigation.navigate('Reset')
        } else {
          this.setState({isloading: false});
          this.setState({error: 'Invalid email'});
        }
      })
      .catch((error) => {
        this.setState({isloading: false});
        console.log('error', error);
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../../assets/forgotpassword.png')}
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
                color: '#81b840',
                fontFamily: 'Montserrat-Bold_0',
              }}>
              Forgot Your Password?
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: '#a1a1a1',
                fontFamily: 'Montserrat-Regular_0',
              }}>
              To recover your password, you need to enter
            </Text>
            <Text
              style={{color: '#a1a1a1', fontFamily: 'Montserrat-Regular_0'}}>
              your registered email address, We will sent the
            </Text>
            <Text
              style={{color: '#a1a1a1', fontFamily: 'Montserrat-Regular_0'}}>
              recovery code to your email
            </Text>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your email / Phone number"
                placeholderTextColor="#81b840"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(email) => this.setState({email: email})}
                onFocus={() => this.setState({error: ''})}
              />
            </View>

            <View style={{width: '70%', alignSelf: 'center'}}>
              <Text style={{color: 'red', fontFamily: 'Montserrat-Regular_0'}}>
                {this.state.error}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.moveToResetPassword();
              }}
              style={styles.buttonStyle}
              activeOpacity={0.5}>
              {this.state.isloading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonTextStyle}>Send</Text>
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
export default ForgotPassword;

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
});
