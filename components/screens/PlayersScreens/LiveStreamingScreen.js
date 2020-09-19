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
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
           
            flex: 1,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../../assets/fake.jpg')}
          />
          <View style={styles.icon}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('PlayerScreen')}>
              <Image
                source={require('../../../assets/backIcon.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
          <Text>ddsafd</Text>
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
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  bottom:{
      height:55,
      backgroundColor:'#81b840',
      bottom:0,
      position:'absolute',
      width:'100%'
  }
});
