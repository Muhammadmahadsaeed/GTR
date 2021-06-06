import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Linking
} from 'react-native';

export default class Privacy extends Component {
  handleClick = () => {
    Linking.canOpenURL('https://guessthatreceipt.com/privacy-policy/').then((supported) => {
      if (supported) {
        Linking.openURL('https://guessthatreceipt.com/privacy-policy/');
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <View style={styles.Notification}>
          <Text style={styles.NotificationText}>Privacy Statement</Text>
        </View>
        <View style={styles.paraView}>
          <Text style={styles.para}>
            Apple inc is not involved in any way with the contest or
            sweepstakes.
          </Text>
        </View>
        <View style={styles.paraView}>
          <Text style={styles.para}>
            Guess That Receipt Game Show (“GTR” or “We”) respects the privacy of
            individuals who visit www.guessthatreceipt.com (the “Website”). This
            policy explains how we collect, maintain, and use personal
            information that you provide to us or is otherwise collected through
            your use of the Website. Because your privacy is important to us, we
            provide you with notice and choices about the collection and use of
            your information. By visiting our Website, you accept the practices
            described in this Privacy Policy.
          </Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.handleClick()} activeOpacity={0.8}>
          <Text style={styles.btnText}>Read more</Text>
        </TouchableOpacity>
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
  Notification: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotificationText: {
    fontFamily: 'Montserrat-Bold',
    color: '#81b840',
    fontSize: 20,
  },
  paraView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  para: {
    fontSize: 16,
    color: '#81b840',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'justify',
  },
  btn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#81b840',
  },
  btnText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
});
