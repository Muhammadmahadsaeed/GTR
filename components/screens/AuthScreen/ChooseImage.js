import React, {Fragment, Component} from 'react';
import ImagePicker from 'react-native-image-picker';
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      
    };
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
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
  resetImage(){
    this.setState({fileUri : ''})
  }
  moveToPaymentScreen(){
    this.props.navigation.navigate('PaymentScreen')
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.ImageSections}>
              <View>{this.renderFileUri()}</View>
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
                <TouchableOpacity style={styles.btnSection} onPress={()=>{this.moveToPaymentScreen()}}>
                  <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSection} onPress={()=> this.resetImage()}>
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    height: '100%',
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    flexDirection: 'row',
    width: '70%',
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageIconStyle: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
  },
});
