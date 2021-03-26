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
  moveToHome(){
    this.props.navigation.navigate('HomeScreen')
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity>
          <View style={styles.row}>
            <Image source={{uri: this.state.image}} style={styles.pic} />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt} ellipsizeMode="tail">
                  {this.state.name}
                </Text>
              </View>
              <View style={{alignSelf: 'center'}}>
                <Image
                  style={styles.mblImage}
                  source={require('../../../assets/star.png')}
                />
                <Text style={styles.mblTxt}>2 month Left</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.moveToHome();
          }}
          style={styles.buttonStyle}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Next </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  nameContainer: {
    alignSelf: 'center',
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
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  mblImage: {
    height: 30,
    width: 30,
    alignSelf: 'center',
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
    marginBottom: 20,
    alignSelf: 'center',
    bottom:0,
    position:'absolute'
  },
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});
