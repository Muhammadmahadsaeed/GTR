import React, {Component} from 'react'
import {Platform, ScrollView, Text, TouchableOpacity, View,Dimensions, StyleSheet} from 'react-native'
import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

interface Props {
}

interface State {
    appId: string,
    token: string,
    channelName: string,
    joinSucceed: boolean,
    peerIds: number[],
}

export default class App extends Component<Props, State> {
    _engine?: RtcEngine

    constructor(props) {
        super(props)
        this.state = {
            appId: '253294740cac43e6965ff2e03099c520',
            token:  '006253294740cac43e6965ff2e03099c520IAAWHfhIOMrVRzT0UpruQa3Y7aZo+gVhhLdjVY5k2c/eK9/qJtEAAAAAEAAPRLuFrinjXwEAAQCuKeNf',
            channelName: 'GTR',
            joinSucceed: false,
            peerIds: [],
        }
       
    }

    componentDidMount() {
        this.init()
    }

  
    init = async () => {
        const {appId} = this.state
        this._engine = await RtcEngine.create(appId)
        await this._engine.enableVideo()

        this._engine.addListener('Warning', (warn) => {
            console.log('Warning', warn)
        })

        this._engine.addListener('Error', (err) => {
            console.log('Error', err)
        })

        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)
            // Get current peer IDs
            const {peerIds} = this.state
            // If new user
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    // Add peer ID to state array
                    peerIds: [...peerIds, uid]
                })
            }
        })

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            const {peerIds} = this.state
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid)
            })
        })

        // If Local user joins RTC channel
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            // Set state variable to true
            this.setState({
                joinSucceed: true
            })
        })
    }

    
     startCall = async () => {
        // Join Channel using null token and channel name
        await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
    }

    endCall = async () => {
        await this._engine?.leaveChannel()
        this.setState({peerIds: [], joinSucceed: false})
    }
    switchCamera(){
        console.log("devices")
    }
    render() {
        return (
            <View style={styles.max}>
                <View style={styles.max}>
                {this._renderVideos()}
                    <View style={styles.buttonHolder}>
                        <TouchableOpacity
                            onPress={this.startCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Start Call </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.endCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> End Call </Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
        )
    }

    _renderVideos = () => {
        const {joinSucceed} = this.state
        return joinSucceed ? (
            <View style={styles.fullView}>
                <RtcLocalView.SurfaceView
                    style={styles.max}
                    channelId={this.state.channelName}
                    renderMode={VideoRenderMode.Hidden}/>
                {this._renderRemoteVideos()}
            </View>
        ) : null
    }

    _renderRemoteVideos = () => {
        const {peerIds} = this.state
        return (
            <ScrollView
                style={styles.remoteContainer}
                contentContainerStyle={{paddingHorizontal: 2.5}}
                horizontal={true}>
                {peerIds.map((value, index, array) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={this.state.channelName}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}/>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  max: {
      flex: 1,
  },
  buttonHolder: {
      height: 100,
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
  },
  button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#0093E9',
      borderRadius: 25,
  },
  buttonText: {
      color: '#fff',
  },
  fullView: {
      width: dimensions.width,
      height: dimensions.height - 100,
  },
  remoteContainer: {
      width: '100%',
      height: 150,
      position: 'absolute',
      top: 5
  },
  remote: {
      width: 150,
      height: 150,
      marginHorizontal: 2.5
  },
  noUserText: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: '#0093E9',
  },
})
