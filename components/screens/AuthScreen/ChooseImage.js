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
      isLoading: false,
      showErorr: '',
      isErorr: false,
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      imgUri: '',
    };
  }
  componentDidMount() {
   console.log(this.props.user.user.access_token)
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
        const source = {uri: response};
        this.setState({
          imgUri: source,
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
        const source = {uri: response};

        this.setState({
          imgUri: source,
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
    let pwd = this.props.navigation.getParam('pwd');
    console.log("=========",this.state.imgUri.uri)
    this.setState({isLoading: true});
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${this.props.user.user.access_token}`,
    );
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('avatar', this.state.imgUri);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('https://app.guessthatreceipt.com/api/users/update', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        let formdata = new FormData();
        formdata.append(
          'email',
          this.props.user.user.user_details.email.toLowerCase(),
        );
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
            this.setState({isloading: false})
            console.log(data)
            // this.props.store_user(data);
            // this.props.navigation.navigate('payitforward');
          })
          .catch((error) => {
            this.setState({isloading: false, showInvalidErorr: true});
          });
        // this.props.store_user(raw);
        // this.props.navigation.navigate('payitforward');
        // this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
        this.setState({isErorr: true});
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
