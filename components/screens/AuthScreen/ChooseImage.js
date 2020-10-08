import React, {Fragment, Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {userObject} from '../../Redux/Action/action';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class ChooseImage extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      showErorr: '',
      isErorr: false,
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
    };
  }
  componentDidMount() {
    const {state} = this.props.navigation;

    this.setState({
      firstName: state.params.firstName,
      lastName: state.params.lastName,
      email: state.params.email,
      phoneNo: state.params.pNum,
      password: state.params.password,
      confirmPassword: state.params.confirmPassword,
    });
  }
  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

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
        const source = {uri: response.uri};

        this.setState({
          filePath: response,
          fileData: response,
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../../assets/admin.png')}
          style={styles.images}
        />
      );
    }
  }
  resetImage() {
    this.setState({fileUri: ''});
  }
  moveToPaymentScreen() {
    this.setState({isLoading: true});
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      password,
      confirmPassword,
    } = this.state;
    var formData = new FormData(this);
    //text data in key value pair form
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNo', phoneNo);
    formData.append('Address', confirmPassword);
    formData.append('PostalCode', 'firstName');
    formData.append('password', password);
    formData.append('imgPath', {
      name: this.state.fileData.fileName,
      type: this.state.fileData.type,
      uri:
        Platform.OS === 'android'
          ? this.state.fileUri
          : this.state.fileData.uri.replace('file://', ''),
    });
    fetch('https://app.guessthatreceipt.com/users/register?', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message == 'Registration successful') {
          this.setState({isLoading: false});
          this.props.store_user(result.message);
          this.props.navigation.navigate('payitforward');
        } else {
          this.setState({isLoading: false});
          this.setState({isErorr: true});
          this.setState({showErorr: result.message});
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Image
            style={styles.backgroundImage}
            source={require('../../../assets/bg1.png')}
          />
          <View style={styles.body}>
          {this.state.isErorr && (
              <View style={styles.showInvalidText}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../assets/LargeInvalidIcon.png')}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    paddingLeft: 10,
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Montserrat-Regular_0',
                    }}>
                    {this.state.showErorr}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.ImageSections}>
              <View style={styles.profileImage}>{this.renderFileUri()}</View>
            </View>
     

            {!this.state.fileUri ? (
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.launchImageLibrary}
                  style={styles.btnSection}>
                  <Image
                    style={styles.imageIconStyle}
                    source={require('../../../assets/gallery.png')}
                  />
                  <Text style={styles.btnText}>Upload Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.launchCamera}
                  style={styles.btnSection}>
                  <Image
                    style={styles.imageIconStyle}
                    source={require('../../../assets/camera.png')}
                  />
                  <Text style={styles.btnText}>Camera</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  style={styles.btnSection}
                  onPress={() => {
                    this.moveToPaymentScreen();
                  }}>
                  {this.state.isLoading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text style={styles.btnText}>Confirm</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnSection}
                  onPress={() => this.resetImage()}>
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    justifyContent: 'center',
    height: '100%',
    width: Dimensions.get('screen').width,
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: '#81b840',
    justifyContent: 'center',
  },
  images: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    flexDirection: 'row',
    width: '70%',
    height: 50,
    backgroundColor: '#81b840',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold_0',
    marginLeft: 10,
  },
  imageIconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  showInvalidText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseImage);
