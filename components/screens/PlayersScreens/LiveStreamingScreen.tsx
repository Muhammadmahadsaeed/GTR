import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

interface Props {}

interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  toggle: boolean;
  enableDisableVideoToggle: boolean;
  enableDisableAudioToggle: boolean;
}

export default class App extends Component<Props, State> {
  _engine?: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      appId: '253294740cac43e6965ff2e03099c520',
      token: '',
      channelName: 'GTR',
      joinSucceed: false,
      peerIds: [],
      toggle: true,
      enableDisableVideoToggle: true,
      enableDisableAudioToggle: true,
    };
  }

  componentDidMount() {
    fetch(
      'http://pombopaypal.guessthatreceipt.com/api/DemoServer/rtcToken?channelName=GTR',
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({token: result.key});
        this.init();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();
    await this._engine.enableAudio();
    // Enable the local video preview.
    await this._engine.startPreview();
    // Set the channel profile as live streaming.
    // await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting)
    // Set the usr role as host.
    // await this._engine.setClientRole(ClientRole.Audience)

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  startCall = async () => {
    // Join Channel using null token and channel name
    this.setState({toggle: false});
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0,
    );
  };

  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({toggle: true, peerIds: [], joinSucceed: false});
  };
  switch() {
    console.log('devices');
    this._engine?.switchCamera();
  }
  enableDisableAudio() {
    if (this.state.enableDisableAudioToggle) {
      this.setState({enableDisableAudioToggle: false});
    } else {
      this.setState({enableDisableAudioToggle: true});
    }
  }
  enableDisableVideo() {
    if (this.state.enableDisableVideoToggle) {
      this.setState({enableDisableVideoToggle: false});
      // this._engine?.disableVideo();
    } else {
      this.setState({enableDisableVideoToggle: true});
      // this._engine?.enableVideo();
    }
  }

  render() {
    return (
      <View style={styles.max}>
        {this._renderVideos()}

        <View style={styles.bottom}>
          <View style={styles.icons}>
            <View style={{height: 35, width: 35}}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require('../../../assets/enableSpeaker.png')}
                  style={styles.cameraImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.enableDisableAudio()}>
                <Image
                  source={
                    this.state.enableDisableAudioToggle
                      ? require('../../../assets/enableMic.png')
                      : require('../../../assets/disableMic.png')
                  }
                  style={styles.cameraImage}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.pauseButton}>
                {this.state.toggle ? (
                  <TouchableOpacity
                    style={styles.pauseButton}
                    activeOpacity={0.8}
                    onPress={this.startCall}>
                    <Image
                      source={require('../../../assets/play.png')}
                      style={styles.pauseButtonImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this.endCall}
                    style={styles.pauseButton}>
                    <Image
                      source={require('../../../assets/pause.png')}
                      style={styles.pauseButtonImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{height: 40, width: 40}}
                onPress={() => this.enableDisableVideo()}>
                <Image
                  source={
                    this.state.enableDisableVideoToggle
                      ? require('../../../assets/enableVideo.png')
                      : require('../../../assets/disableVideo.png')
                  }
                  style={styles.cameraImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: 40, width: 40}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.switch()}>
                <Image
                  source={require('../../../assets/camera.png')}
                  style={styles.cameraImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : (
      <View>
        <Image
          style={{height: '100%', width: '100%'}}
          source={require('../../../assets/fake.jpg')}
        />
      </View>
    );
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              key={index}
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
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
    height: '100%',
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  //   bottom
  bottom: {
    height: 55,
    backgroundColor: '#81b840',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  pauseButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
  },
  pauseButtonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconView: {
    height: 40,
    width: 50,
  },
  cameraImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});