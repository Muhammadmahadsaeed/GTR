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
  Dimensions,
} from 'react-native';

export default class SeePlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {
          id: 1,
          name: 'Mark Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
        },
        {
          id: 2,
          name: 'Clark Man',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
        },
        {
          id: 3,
          name: 'Jaden Boor',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
        },
        {
          id: 4,
          name: 'Srick Tree',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
        },
        {
          id: 5,
          name: 'Erick Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
        },
        {
          id: 6,
          name: 'Francis Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
        },
        {
          id: 8,
          name: 'Matilde Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
          id: 9,
          name: 'John Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
        },
        {
          id: 10,
          name: 'Fermod Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
        },
        {
          id: 11,
          name: 'Danny Doe',
          status: 'active',
          image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
      ],
    };
  }
  moveToHome() {
    this.props.navigation.navigate('HomeScreen');
  }
  renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{uri: item.image}} style={styles.pic} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.mblTxt}>Answer</Text>
              <View
                style={{
                  backgroundColor: '#81b840',
                  borderRadius: 50,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 30,
                  paddingRight: 30,
                }}>
                <Text
                  style={{fontFamily: 'Montserrat-Regular_0', color: 'white'}}>
                  $500
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <View style={styles.heading}>
          <Text style={styles.headingText}>Gamers</Text>
        </View>
        <FlatList
          style={{width: '100%', marginBottom: 20}}
          extraData={this.state}
          data={this.state.calls}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  heading: {
    alignItems: 'center',
    margin: 10,
  },
  headingText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold_0',
    color: '#81b840',
  },
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
    fontFamily: 'Montserrat-Regular_0',
  },
});
