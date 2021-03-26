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
class SeePlayers extends Component {
  // constructor() {
  //   super();
  state = {
    users: [],
    isLoading: true,
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
        this.setState({isLoading: false, users: result.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  moveToHome() {
    this.props.navigation.navigate('HomeScreen');
  }
  renderItem = ({item}) => {
    return (
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
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.user.first_name} {item.user.last_name}
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
                style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>
                {item.answer}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  sendRewars = () => {
    const {users} = this.state;
   
    let rewards = users.map((item) => {
      let reward = {
        game_id: item.game_id,
        user_id: item.user_id,
        rewardAmount: item.rewardAmount,
      };
      return reward;
    });
 
    fetch('https://app.guessthatreceipt.com/api/saveRewardsAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.user.user.user.access_token}`,
      },
      body: JSON.stringify({rewards}),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/bg1.png')}
        />
        <View style={styles.heading}>
          <Text style={styles.headingText}>Gamers</Text>
        </View>
        {this.state.isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size={60} color="#81b840" />
          </View>
        )}
        <FlatList
          style={{height: '20%'}}
          extraData={this.state}
          data={this.state.users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
        <TouchableOpacity style={styles.bottomView} onPress={this.sendRewars}>
          <Text style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>
            Send Rewards
          </Text>
        </TouchableOpacity>
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
    fontFamily: 'Montserrat-Bold',
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
    paddingTop: 10,
    paddingBottom: 10,
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
    fontFamily: 'Montserrat-Regular',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: 150,
    height: 50,
    backgroundColor: '#81b840',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps, null)(SeePlayers);
