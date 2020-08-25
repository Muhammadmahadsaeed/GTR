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

class ForgotPassword extends React.Component {
  constructor() {
    super();
  }

  moveToResetPassword() {
    this.props.navigation.navigate('ResetPassword');
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
                <Text style={{fontSize:20, color:'#81b840',fontFamily:'Montserrat-Bold_0'}}>Forgot Your Password?</Text>
                <Text style={{marginTop:5,color:'#a1a1a1',fontFamily:'Montserrat-Regular_0'}}>To recover your password, you need to enter</Text>
                <Text style={{color:'#a1a1a1',fontFamily:'Montserrat-Regular_0'}}>your registered email address, We will sent the</Text>
                <Text style={{color:'#a1a1a1',fontFamily:'Montserrat-Regular_0'}}>recovery code to your email</Text>
            </View>
          <KeyboardAvoidingView enabled>
           
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your email / Phone number"
                placeholderTextColor="#81b840"
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
           
          
            <TouchableOpacity onPress={()=>{this.moveToResetPassword()}}
              style={styles.buttonStyle}
              activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Send</Text>
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
  forgortPasswordText:{
      marginTop:15,
      marginBottom:15,
      alignItems:'center',
     
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
    backgroundColor: '#3d900e',
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
  },
 
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily:'Montserrat-Regular_0'
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#81b840',
    fontFamily:'Montserrat-Regular_0'
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
