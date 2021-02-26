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
  FlatList,
} from 'react-native';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import requestCameraAndAudioPermission from '../DailyChallenges/Permission';
import {connect} from 'react-redux';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  toggle: boolean;
  enableDisableVideoToggle: boolean;
  enableDisableAudioToggle: boolean;
  schedule: string[];
}
class LiveStreamingScreen extends Component<Props, State> {
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
      schedule: [],
    };
  }

  componentDidMount() {
    this.getSchedule();
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        this.getToken();
      });
    }
  }
  getToken() {
    fetch(
      'http://pombopaypal.guessthatreceipt.com/api/DemoServer/rtcToken?channelName=GTR',
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({token: result.key});
        this.init().then(() => {
          this.setState({toggle: false});
          this._engine?.joinChannel(
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
  }
  getSchedule() {
    fetch('https://app.guessthatreceipt.com/api/getGameSchedule', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.user.user.user.access_token}`,
      },
    })
      .then((result) => result.json())
      .then((res) => {
        this.setState({schedule: res.data});
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
      this.getJoinedUsers()
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
      this.setState({joinSucceed: true});
      this.getJoinedUsers();
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
    this.getJoinedUsers();
  };

  endCall = async () => {
    const role = this.props.user.user.user.user_details.role_id;
    if (role === '2') {
      await this._engine?.leaveChannel();
      this.setState({toggle: true, peerIds: [], joinSucceed: false});
    } else {
      const schedule = this.state.schedule;
      const params = new URLSearchParams();
      params.append('schedule_id', schedule.id);
      params.append('status', 'expired');
      fetch('https://app.guessthatreceipt.com/api/updateGameSchedule', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.props.user.user.user.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: params.toString(),
      })
        .then((result) => result.json())
        .then((res) => {
          this._engine?.leaveChannel();
          this.setState({toggle: true, peerIds: [], joinSucceed: false});
        })
        .catch((err) => console.log(err));
    }
  };
  switch() {
    this._engine?.switchCamera();
  }
  enableDisableAudio() {
    if (this.state.enableDisableAudioToggle) {
      this.setState({enableDisableAudioToggle: false});
      this._engine?.disableAudio();
    } else {
      this.setState({enableDisableAudioToggle: true});
      this._engine?.enableAudio();
    }
  }
  enableDisableVideo() {
    if (this.state.enableDisableVideoToggle) {
      this.setState({enableDisableVideoToggle: false});
      this._engine?.disableVideo();
    } else {
      this.setState({enableDisableVideoToggle: true});
      this._engine?.enableVideo();
    }
  }
  componentWillUnmount() {
    this._engine?.destroy();
  }
  moveToGamer() {
    this.props.navigation.navigate('PlayerScreen');
  }
  getJoinedUsers() {
    fetch('https://app.guessthatreceipt.com/api/gameUsers', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.user.user.user.access_token}`,
      },
    })
      .then((result) => result.json())
      .then((res) => {
        console.log('users join===========', res.data.length);
        // this.setState({schedule: res.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  moveToAnswer() {
    this.getSchedule();
    console.log('schedule====');
    if (this.state.schedule.is_expired === 'active') {
      console.log('abhi nahi');
    } else {
      console.log('hogya');
    }
    // const params = new URLSearchParams();
    // params.append('schedule_id', '');
    // params.append('status', '');
    // fetch('https://app.guessthatreceipt.com/api/updateGameSchedule', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${this.props.user.user.user.access_token}`,
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    // })
    //   .then((result) => result.json())
    //   .then((res) => {
    //         if (res.data != null) {
    //           const role = this.props.user.user.user.user_details.role_id;
    //           if (role === '2') {
    //             this.props.navigation.navigate('UserAnswerScreen', {
    //               schedule: res,
    //             });
    //           } else {
    //             this.props.navigation.navigate('PlayerScreen');
    //           }
    //         }
    //   });
  }
  render() {
    const role = this.props.user.user.user.user_details.role_id;
    return (
      <View style={styles.max}>
        {this._renderVideos()}
        <View style={styles.icon}>
          {role === '2' ? (
            <TouchableOpacity onPress={() => this.moveToAnswer()}>
              <Image
                source={require('../../../assets/backIcon.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.moveToGamer()}>
              <Image
                source={require('../../../assets/backIcon.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          )}
        </View>
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
    const {joinSucceed, peerIds} = this.state;
    const role = this.props.user.user.user.user_details.role_id;

    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />

        <FlatList
          data={peerIds}
          style={styles.remoteContainer}
          keyExtractor={(index) => index.toString()}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  height: 85,
                  width: 85,
                  backgroundColor: '#81b840',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RtcRemoteView.SurfaceView
                  style={styles.remote}
                  uid={item}
                  channelId={this.state.channelName}
                  renderMode={VideoRenderMode.Hidden}
                  zOrderMediaOverlay={true}
                />
                <View
                  style={{
                    width: 75,
                    alignSelf: 'center',
                    top: 0,
                    position: 'absolute',
                    paddingTop: 10,
                    paddingLeft: 5,
                  }}>
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 100,
                      backgroundColor: 'red',
                    }}></View>
                </View>
              </View>
            );
          }}
        />
      </View>
    ) : (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={60} color="#81b840" />
        <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  max: {
    flex: 1,
    justifyContent: 'center',
  },
  adminView: {
    width: 200,
    height: 250,
  },
  icon: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 100,
    width: 50,
    position: 'absolute',
  },
  iconImage: {
    resizeMode: 'cover',
  },
  fullView: {
    flex: 1,
  },
  remoteContainer: {
    flex: 1,
    position: 'absolute',
  },
  remote: {
    width: 75,
    height: 75,
    borderRadius: 100,
    alignSelf: 'center',
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
