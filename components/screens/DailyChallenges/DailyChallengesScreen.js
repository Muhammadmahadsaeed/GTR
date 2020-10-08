import React, {useState} from 'react';
import {connect} from 'react-redux';
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

class DailyChallengesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
    };
  }

  moveToPlayerScreens() {
    this.props.navigation.navigate('LiveScreen');
  }
  moveToGameScreen() {
    this.props.navigation.navigate('GameScreen');
  }
  render() {
    console.log(this.props.user);
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../assets/Logo.png')}
              style={{
                width: '60%',
                height: 120,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View>
          <KeyboardAvoidingView enabled>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.heading}>Daily</Text>
              <Text style={styles.heading}>Challenge</Text>
              <Text style={[styles.para, {marginTop: 20}]}>
                Guess That Receipt
              </Text>
              <Text style={styles.para}> to win the price of the receipt</Text>
            </View>
            {this.props.user.user.isAdmin == 1 ? (
              <TouchableOpacity
                onPress={() => {
                  this.moveToPlayerScreens();
                }}
                style={[styles.buttonStyle, {marginTop: 70}]}
                activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Live</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.moveToGameScreen();
                }}
                style={[styles.buttonStyle, {marginTop: 70}]}
                activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Play</Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  heading: {
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
    fontSize: 35,
  },
  para: {
    fontFamily: 'Montserrat-Regular_0',
    color: '#81b840',
    fontSize: 16,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(DailyChallengesScreen);
