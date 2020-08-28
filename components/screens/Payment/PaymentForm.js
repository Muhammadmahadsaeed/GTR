import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default class PaymentForm extends Component {
  constructor() {
    super();
    this.state ={
    }
  }

  render() {
  
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Subscrition yearly</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView enabled>
            <View style={styles.paymentMethod}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold_0',
                  color: 'gray',
                }}>
                Total price
              </Text>
              <Text
                style={{
                  paddingTop: 15,
                  fontSize: 35,
                  fontFamily: 'Montserrat-Bold_0',
                  color: '#81b840',
                }}>
                $7,99.00
              </Text>
              <Text
                style={{
                  paddingTop: 15,
                  fontFamily: 'Montserrat-Bold_0',
                  color: 'gray',
                }}>
                Payment method
              </Text>
            </View>
            <View style={styles.paymentButtonMethod}>
              <TouchableWithoutFeedback
                style={[styles.creditButton, {backgroundColor: 'silver'}]}>
                <Text style={styles.creditButtonText}>Credit</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={[styles.creditButton, {backgroundColor: '#3d900e'}]}>
                <Text style={styles.creditButtonText}>Paypal</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={[styles.creditButton, {backgroundColor: 'silver'}]}>
                <Text style={styles.creditButtonText}>Other</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.form}>
              
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
    width: '95%',
    alignSelf: 'center',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  headingText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
  },
  paymentMethod: {
    marginTop: 35,
    marginLeft: 5,
  },
  paymentButtonMethod: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  creditButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 50,
  },
  creditButtonText: {
    fontFamily: 'Montserrat-Bold_0',
    color: 'white',
  },
});
