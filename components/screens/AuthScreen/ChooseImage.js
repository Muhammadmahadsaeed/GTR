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


export default class ChooseImage extends Component {
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
    this.props.navigation.navigate('payitforward')
  }
  render() {
    const { state } = this.props.navigation
    console.log("=============",state.params)
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
  profileImage :{
    width: 200,
    height: 200,
    borderWidth:5,
    borderRadius:100,
    borderColor:'#81b840',
    justifyContent:'center'
  },
  images: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode:'cover'
   
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
    fontFamily:'Montserrat-Bold_0',
    marginLeft:10
  },
  imageIconStyle: {
    height:30,
    width:30,
    resizeMode:'contain'
    
  },
});
