import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

class Winner extends React.Component {
  componentDidMount() {
    let formData = new FormData();
    
    fetch('https://app.guessthatreceipt.com/api/gameAnwerList?reward=reward&status=expired', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.user.user.user.access_token}`,
        'Content-Type': 'application/json',
      },
      
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{fontSize: 23}}> Winner </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
export default connect(mapStateToProps, null)(Winner);
