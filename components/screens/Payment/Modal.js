import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

class ModalView extends React.Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
    };
  }
  componentDidMount(){
   
  }
  show = () => {
  
    this.setState({modalVisible: true});
  };
  close = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const {modalVisible} = this.state;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={this.close}>
        <TouchableOpacity
          onPress={this.close}
          activeOpacity={1}
          style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View
                style={{
                  height: 100,
                  width: 100,
                }}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/smile.png')}
                />
              </View>
              <View style={styles.paymentContainer}>
                <Text
                  style={{
                    color: '#81b840',
                    fontSize: 25,
                    fontFamily: 'Montserrat-Bold_0',
                  }}>
                  Thank you
                </Text>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular_0',
                    }}>
                    Get access to financia estimates
                  </Text>
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity style={styles.subscriberButton} onPress={this.close}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      paddingLeft: 5,
                      fontFamily: 'Montserrat-Regular_0',
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    paddingVertical: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    height: '100%',
    width: '100%',
  },

  paymentContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    justifyContent: 'center',
    marginTop:20
  },
  subscriberButton: {
    backgroundColor: '#81b840',
    paddingVertical:8,
    paddingHorizontal: 50,
    borderRadius: 50,
    
  },
});

export default ModalView;
