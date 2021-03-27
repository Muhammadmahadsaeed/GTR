import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
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
      confirmPassword: '',
      hidePassword: true,
      hideConfirmPassword: true,
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
    };
  }
  setPasswordVisibale() {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return (
        <Image
          source={{ uri: this.state.fileUri }}
          style={styles.imageIconStyle}
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/dummy.png')}
          style={styles.imageIconStyle}
        />
      );
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={styles.backgroundImage}
          source={require('../../assets/bg1.png')}
        />
        <View style={styles.heading}>
          <Text style={styles.headingText}>Profile</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            backgroundColor: 'white',
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10
          }}>
          <KeyboardAvoidingView enabled>
            <TouchableOpacity style={styles.editBtnSection1}>
              <Image
                style={styles.imageIconStyle}
                source={require('../../assets/pencl.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 5,
                borderColor: '#81b840',
                width: 120,
                height: 120,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={this.launchImageLibrary}
                style={styles.editBtnSection}>
                <Image
                  style={styles.imageIconStyle}
                  source={require('../../assets/pencl.png')}
                />
              </TouchableOpacity>
              {this.renderFileUri()}
            </View>
            <View style={[styles.SectionStyle, { marginTop: 10 }]}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="First Name"
                placeholderTextColor="#81b840"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </View>
            {/* <View style={styles.SectionStyle}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Last Name"
                placeholderTextColor="#81b840"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </View> */}
            {/* <View style={styles.SectionStyle}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Phone Number"
                placeholderTextColor="#81b840"
                keyboardType="numeric"
              />
            </View> */}

            <View style={styles.SectionStyle}>
              <Text style={styles.label}>Password</Text>
              <View style={{flexDirection:'row'}}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Password"
                  placeholderTextColor="#81b840"
                  secureTextEntry={this.state.hidePassword}
                  returnKeyType="next"
                  onChangeText={(e) => this.setState({ password: e })}
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
                        ? require('../../assets/hide.png')
                        : require('../../assets/view.png')
                    }
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
              </View>



            </View>

            <TouchableOpacity
              style={[styles.buttonStyle, { marginTop: 10 }]}
              activeOpacity={0.5}
              onPress={() => {
                this.moveToChooseImage();
              }}>
              <Text style={styles.buttonTextStyle}>Update</Text>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  heading: {
    alignItems: 'center',
    margin: 10
  },
  headingText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#81b840'
  },
  editBtnSection1: {
    backgroundColor: '#81b840',
    height: 25,
    width: 25,
    borderColor: '#81b840',
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  SectionStyle: {
    backgroundColor:'red',
    height: 60,
    width: '70%',
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignSelf: 'center',
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    paddingLeft: 15,
    color: 'gray',
  },
  editBtnSection: {
    height: 30,
    width: 30,
    borderColor: '#81b840',
    borderWidth: 5,
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
  },
  imageIconStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
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
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },

  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  inputStyle: {
    flex: 1,
    color: '#81b840',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#81b840',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
  },
  touchableButton: {
    backgroundColor: 'red',
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
