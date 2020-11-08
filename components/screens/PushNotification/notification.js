import React, { useEffect } from 'react';
import {Platform, StyleSheet,Text, View} from 'react-native';
import firebase, { notifications } from 'react-native-firebase';


const Notification = ()=> {
    useEffect(() =>{
      getToken()
        createChannel();
        notificationListener()
    },[])
    // get token
    const getToken = async() =>{
      const firebaseToken = await firebase.messaging().getToken()
      console.log(firebaseToken)
      if(firebaseToken){
        firebase.messaging().subscribeToTopic('topic')
      }
    }
    // create channel
    const createChannel = () =>{
        const channel = new firebase.notifications.Android.Channel(
            'channelId',
            'channelName',
            firebase.notifications.Android.Importance.Max
        ).setDescription('Description')
        firebase.notifications().android.createChannel(channel)
    }
    //foreground notification 
    const notificationListener = () =>{
        firebase.notifications().onNotification((notification)=>{
            if(Platform.Os === 'android'){
                const localNotification = new firebase.notifications.Notification({
                    sound : 'default',
                    show_in_foreground: true,
                })
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .android.setChannelId('channelId')
                .android.setPriority(firebase.notifications.Android.Priority.High)

                firebase.notifications().displayNotification(localNotification)
                .catch((err) => console.log(err))
            }
        })
    }
  return (
    <View style={styles.container}>
        <Text>Notification</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Notification;
