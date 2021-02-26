//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {connect} from 'react-redux';

class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      proileImage: '../../../assets/admin.png',

      items: [
        {
          navOptionName: 'Home',
          screenToNavigate: 'HomeScreen',
        },
        {
          navOptionName: 'Pay it forward',
          screenToNavigate: 'payitforward',
        },
        {
          navOptionName: 'Live',
          screenToNavigate: 'LiveScreen',
        },
        {
          navOptionName: 'Contact us',
          screenToNavigate: 'Contact us',
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({user: this.props.user.user.user_details});
  }
  logOut() {
    
    let formdata = new FormData();
    formdata.append('status', 'off');
    fetch('https://app.guessthatreceipt.com/api/userOnOff', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.user.access_token}`,
      },
      body: formdata,
    })
      .then((response) => response.json())

      .then((data) => {
        this.props.navigation.navigate('Login');
        this.props.removeUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const {user} = this.state;

    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style={styles.sideMenuProfile}>
          <Image
            source={{
              uri: `https://app.guessthatreceipt.com/storage/${user.avatar}`,
            }}
            style={styles.sideMenuProfileIcon}
          />
        </View>
        <View style={styles.profileInfo}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold_0',
                fontSize: 22,
              }}>
              {user.first_name} {user.last_name}
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              marginBottom: 20,
              flexDirection: 'row',
              // justifyContent: 'space-around',
            }}>
            <Text style={styles.profileInfoText}>Phone No</Text>
            <Text> : </Text>
            <Text style={styles.profileInfoTextRegular}>
              {user.phone_number}
            </Text>
          </View>
        </View>

        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{width: '100%'}}>
          {this.state.items.map((item, key) => (
            <View
              style={{
                alignItems: 'flex-start',
                paddingTop: 5,
                paddingBottom: 5,
                marginRight: 20,
                marginLeft: 30,
              }}
              key={key}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-Regular_0',

                  color:
                    global.currentScreenIndex === key ? '#81b840' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  marginTop: 5,
                  backgroundColor: '#81b840',
                }}
              />
            </View>
          ))}
        </View>
        <View style={{position: 'absolute', bottom: 30}}>
          <Text
            onPress={() => {
              this.logOut();
            }}
            style={{
              fontFamily: 'Montserrat-Bold_0',
              color: '#81b840',
              fontSize: 16,
            }}>
            Log Out
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },

  sideMenuProfile: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: '#81b840',
    marginTop: 30,
  },
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  profileInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfoText: {
    fontFamily: 'Montserrat-Bold_0',
  },
  profileInfoTextRegular: {
    fontFamily: 'Montserrat-Regular_0',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (RemoveUser) => 
      dispatch({type: 'REMOVE_USER', payload: RemoveUser}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomSidebarMenu);
