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
  ActivityIndicator,
} from 'react-native';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

import requestCameraAndAudioPermission from '../DailyChallenges/Permission';
import {connect} from 'react-redux';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

class LiveStreamingScreen extends Component {
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
    this._engine = React.createRef();
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        fetch(
          'http://pombopaypal.guessthatreceipt.com/api/DemoServer/rtcToken?channelName=GTR',
          {
            method: 'GET',
          })
          .then((res) => res.json())
          .then((result) => {
            this.setState({token: result.key});
            this.init().then(() => {
              this.setState({toggle: false});
              this._engine.current.joinChannel(
                result.key,
                this.state.channelName,
                null,
                0,
              );
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }

  init = async () => {
    const {appId} = this.state;
    this._engine.current = await RtcEngine.create(appId);
    await this._engine.current.enableVideo();
    await this._engine.current.enableAudio();
    // Enable the local video preview.
    await this._engine.current.startPreview();
    this._engine.current.addListener('UserJoined', (uid, elapsed) => {
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

    this._engine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        // Set state variable to true
        this.setState({
          joinSucceed: true,
        });
      },
    );
  };

  startCall = async () => {
    // Join Channel using null token and channel name
    this.setState({toggle: false});
    await this._engine.current.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0,
    );
  };

  endCall = async () => {
    console.log('call==');
    await this._engine.current.leaveChannel();
    this.setState({toggle: true, peerIds: [], joinSucceed: false});
  };
  switch() {
    this._engine.current.switchCamera();
  }
  enableDisableAudio() {
    if (this.state.enableDisableAudioToggle) {
      this.setState({enableDisableAudioToggle: false});
      this._engine.current.disableAudio();
    } else {
      this.setState({enableDisableAudioToggle: true});
      this._engine.current.enableAudio();
    }
  }
  enableDisableVideo() {
    if (this.state.enableDisableVideoToggle) {
      this.setState({enableDisableVideoToggle: false});
      this._engine.current.disableVideo();
    } else {
      this.setState({enableDisableVideoToggle: true});
      this._engine.current.enableVideo();
    }
  }
  componentWillUnmount() {
    console.log('call hoa');
    // this._engine.current.destory()
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
                    activeOpacity={0.8}
                    onPress={this.startCall}>
                    <Image
                      source={require('../../../assets/play.png')}
                      style={styles.pauseButtonImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity activeOpacity={0.8} onPress={this.endCall}>
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
      // <View>
      //   <Image
      //     style={{height: '100%', width: '100%'}}
      //     source={require('../../../assets/fake.jpg')}
      //   />
      // </View>
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={60} color="#81b840" />
        <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
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
    // position: 'absolute',
  },
  pauseButtonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps, null)(LiveStreamingScreen);
