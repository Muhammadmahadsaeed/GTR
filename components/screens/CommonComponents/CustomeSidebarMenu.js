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
          navOptionName: 'First Screen',
          screenToNavigate: 'NavScreen1',
        },
        {
          navOptionName: 'Second Screen',
          screenToNavigate: 'NavScreen2',
        },
        {
          navOptionName: 'Third Screen',
          screenToNavigate: 'NavScreen3',
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
            }}>
            <Text>Maciek </Text>
            <Text> Szott</Text>
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
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}
              key={key}>
              <View style={{marginRight: 10, marginLeft: 20}}>
                {/* <Icon name={item.navOptionThumb} size={25} color="#808080" /> */}
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
              {/* <View
                style={{
                  width: '100%',
                  height: 1,

                  marginTop: 10,
                }}
              /> */}
            </View>
          ))}
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
    borderColor: 'green',
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
