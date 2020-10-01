import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
const height = Dimensions.get('window').height;
export default class AnswerScreen extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../../assets/fake.jpg')}
          />
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PlayerScreen')}>
              <Image
                source={require('../../../assets/backIcon.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
           
              <View style={styles.pauseButton}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/pause.png')}
                    style={styles.pauseButtonImage}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.camera}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/camera.png')}
                    style={styles.cameraImage}
                  />
                </TouchableOpacity>
              </View>
          
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  icon: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 100,
    width: 50,
    position: 'absolute',
  },
  iconImage: {
    resizeMode: 'cover',
  },
  bottom: {
    height: 55,
    backgroundColor: '#81b840',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    justifyContent:'center'
  },
  pauseButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom:20,
    position:'absolute'
  },
  pauseButtonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  camera: {
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignSelf:'flex-end',
    marginRight:10
  },
  cameraImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
   
  },
});
