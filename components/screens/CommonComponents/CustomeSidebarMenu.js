//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      proileImage: '../../../assets/admin.png',

      items: [
        {
          navOptionName: 'Winners',
          screenToNavigate: 'winners',
        },
        {
          navOptionName: 'Pay it forward',
          screenToNavigate: 'payitforward',
        },
        {
          navOptionName: 'Contact us',
          screenToNavigate: 'contact',
        },
        {
          navOptionName: 'Support',
          screenToNavigate: 'support',
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style={styles.sideMenuProfile}>
          <Image
            source={require('../../../assets/admin.png')}
            style={styles.sideMenuProfileIcon}
          />
        </View>
        <View style={styles.profileInfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:10
            }}>
            <Text  style={{
              fontFamily: 'Montserrat-Bold_0',
            
              fontSize: 22,
            }}>Maciek Szott</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Phone No</Text>
            <Text> : </Text>
            <Text>03362474325</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Rate</Text>
            <Text> : </Text>
            <Text>05/06</Text>
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
                  marginTop: 20,
                  backgroundColor: '#81b840',
                }}
              />
            </View>
          ))}
        </View>
        <View style={{position: 'absolute', bottom: 30}}>
          <Text
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
    width: 150,
    height: 150,
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
  },
});
