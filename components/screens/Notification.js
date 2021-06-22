import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          comment: 'Lorem ipsum dolor sit amet, consectetuer ',
        },
        {
          id: 2,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          name: 'John DoeLink',
          comment: 'Lorem ipsum dolor sit amet, consectetuer ',
        },
      ],
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.backgroundImage}
          source={require('../../assets/bg1.png')}
        />
        <View style={styles.Notification}>
          <Text style={styles.NotificationText}>Notifications</Text>
        </View>
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            console.log(Notification.image)
            return (
              <View style={styles.container}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={styles.image}
                    source={{uri :Notification.image}}
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.comment}>
                    <Text rkType="primary3 mediumLine" style={{ fontFamily: 'Montserrat-Regular',}}>
                      {Notification.comment}
                    </Text>
                  </View>

                  <View style={styles.contentHeader}>
                    <Text style={styles.time}>9:58 am</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  Notification: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotificationText: {
    fontFamily: 'Montserrat-Bold',
    color: '#81b840',
    fontSize: 20,
  },
  root: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingTop: 22,
    paddingBottom: 22,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 20,
    flex: 1,
  },
  comment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentHeader: {
    alignSelf: 'flex-end',
    
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 5,
  },
  time: {
    fontSize: 11,
    color: '#81b840',
    fontFamily: 'Montserrat-Regular',
  },
});
