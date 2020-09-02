//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  TextInput,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

// import all basic components

export default class Home extends Component {
  //Screen1 Component
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.MainContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}>
              <View style={styles.headerBackground}></View>
              <View style={styles.searchBox}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Search anything..."
                  placeholderTextColor="gray"
                />
                <Image
                  source={require('../../assets/searchIcon.png')}
                  style={styles.searchIcon}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.body}>
            <View style={styles.challengeView}>
              <View>
                <Text style={styles.challengeViewHeading}>Daily Challenge</Text>
                <Text style={styles.challengeViewPara}>
                  Lorum ipsum about react
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Text style={styles.challengeViewTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxes}>
              <View style={styles.bigBox}></View>
              <View style={styles.smallBox}></View>
            </View>
            <View style={styles.challengeView}>
              <View>
                <Text style={styles.challengeViewHeading}>Daily Challenge</Text>
                <Text style={styles.challengeViewPara}>
                  Lorum ipsum about react
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Text style={styles.challengeViewTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxes}>
              <View style={styles.smallBox}></View>
              <View style={styles.bigBox}></View>
            </View>
            <View style={styles.challengeView}>
              <View>
                <Text style={styles.challengeViewHeading}>Daily Challenge</Text>
                <Text style={styles.challengeViewPara}>
                  Lorum ipsum about react
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Text style={styles.challengeViewTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxes}>
              <View style={styles.smallBox}></View>
              <View style={styles.bigBox}></View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  header: {
    height: 80,
  },
  headerBackground: {
    height: 40,
    backgroundColor: '#81b840',
    position: 'relative',
  },

  searchBox: {
    position: 'absolute',
    marginTop: 10,
    height: 60,
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Montserrat-Regular_0',
  },
  searchIcon: {
    height: 40,
    width: 40,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  body: {
    marginTop: 5,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  challengeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  challengeViewHeading: {
    fontFamily: 'Montserrat-Bold_0',
    fontSize: 26,
    color: '#81b840',
  },
  challengeViewPara: {
    fontFamily: 'Montserrat-Regular_0',
    color: 'gray',
  },
  challengeViewTextView: {
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
  },
  boxes: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  bigBox: {
    height: 130,
    width: '63%',
    backgroundColor: '#81b840',
    borderRadius: 15,
  },
  smallBox: {
    height: 130,
    width: '35%',
    backgroundColor: '#81b840',
    borderRadius: 15,
  },
});
