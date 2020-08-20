import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class UserListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
          id: 1,
          name: 'Mark Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
        
    };
  }


  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.paymentContainer}>
          <View style={styles.paymentText}>
            <Text style={{color: '#81b840', fontSize: 20, fontWeight: 'bold'}}>
              Pay it forward{' '}
            </Text>
          </View>
          <View style={styles.paymentButton}>
            <Text style={[styles.paymentButtonText, {paddingRight: 30}]}>
              Giver
            </Text>
            <Text
              style={[
                styles.paymentButtonText,
                {
                  paddingLeft: 30,
                  paddingRight: 30,
                  color: 'white',
                  backgroundColor: 'green',
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                },
              ]}>
              User List
            </Text>
          </View>
        </View>
        <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{uri: this.state.image}} style={styles.pic} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
               
                ellipsizeMode="tail">
                {this.state.name}
              </Text>
            </View>
            <View style={{alignSelf:'center'}}>
              <Image style={styles.mblImage} source={require('../../../assets/camera.png')}/>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  paymentButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 30,
    marginTop: 20,
  },
  paymentButtonText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  paymentText: {
    marginTop: 10,
    alignItems: 'center',
  },
  row: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf:'center'
  },
  nameContainer: {
   alignSelf:'center'
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
   
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
    alignSelf:'flex-end',
    paddingTop:10
  },
  mblImage:{
      height:50,
      width:50
  }
});
