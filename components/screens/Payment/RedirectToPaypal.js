import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
export default class RedirectToPaypal extends React.Component {
  state = {
    showModal: '',
    status: 'Pending',
  };
  handleResponse = (data) => {
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  componentDidMount(){
      
      this.setState({showModal : this.props.navigation.state.params.showModal})
  }
  render() {
     console.log("===========",this.state.showModal)
    return (
      <View style={{marginTop: 100}}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            source={{uri: 'http://app.guessthatreceipt.com/pay'}}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>
        {/* <TouchableOpacity
          style={{width: 300, height: 100}}
          onPress={() => this.setState({showModal: true})}>
          <Text>Pay with Paypal</Text>
        </TouchableOpacity>
        <Text>Payment Status: {this.state.status}</Text> */}
      </View>
    );
  }
}
