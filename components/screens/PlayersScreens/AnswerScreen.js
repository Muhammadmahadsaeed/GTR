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
        <View style={styles.video}>
          {/* <Image
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            source={require('../../../assets/videoFrame.png')}
          /> */}
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView enabled>
            <View style={styles.answerView}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.heading}>Guess that receipt</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="$ 00.00"
                  placeholderTextColor="#81b840"
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.moveToGameScreen();
                  }}
                  style={[styles.buttonStyle, {}]}
                  activeOpacity={0.5}>
                  <Text style={styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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
  heading: {
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
    fontSize: 25,
  },
  video: {
    width: '100%',
    height: '45%',
    backgroundColor: 'blue',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    width: '40%',
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    flex: 1,
    color: '#81b840',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 2,
    borderColor: '#81b840',
    fontFamily: 'Montserrat-Regular_0',
    textAlign: 'center',
  },
  answerView: {
    marginTop: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 8,
    width: '95%',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height - 375
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
    // marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },

  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold_0',
  },
});
