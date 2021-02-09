import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
class Winner extends Component {
  // constructor() {
  //   super();
  state = {
    users: [],
    isLoading: true
  };
  // }
  componentDidMount() {
    fetch(
      'https://app.guessthatreceipt.com/api/gameAnwerList?reward=reward&status=expired',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.props.user.user.user.access_token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({isLoading: false,users: result.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderItem = ({item}) => {
    console.log(item.user);
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image
            source={{
              uri: `https://app.guessthatreceipt.com/storage/${item.user.avatar}`,
            }}
            style={styles.pic}
          />
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
                {item.user.name}
              </Text>
            </View>
            {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            </View> */}
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
          source={require('../../assets/bg1.png')}
        />
        <View style={styles.heading}>
          <Text style={styles.headingText}>Winners</Text>
        </View>
        {this.state.isLoading &&
          <View style={styles.activityIndicator}>
            <ActivityIndicator size={60} color="#81b840" />
          </View>
  }
          <FlatList
            style={{width: '100%', marginBottom: 20}}
            extraData={this.state}
            data={this.state.users}
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps, null)(Winner);
