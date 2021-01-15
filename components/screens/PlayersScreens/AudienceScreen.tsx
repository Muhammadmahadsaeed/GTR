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
import {connect} from 'react-redux';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
interface Props {}

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
}
class AudienceScreen extends Component<Props, State> {
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
        this.init().then(() => {
          this.setState({toggle: false});
          this._engine?.joinChannel(
            this.state.token,
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

  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine?.enableVideo();
    await this._engine?.enableAudio();
    // Enable the local video preview.
    await this._engine?.startPreview();
    // Set the channel profile as live streaming.
    await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
    // Set the usr role as host.
    await this._engine?.setClientRole(ClientRole.Audience);
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
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

    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
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

  componentWillUnmount() {
    console.log('call hoa');
    this._engine?.destroy();
  }

  render() {
    return (
      <View style={styles.max}>
        {this._renderVideos()}
        <View style={styles.bottom}>
          <View style={styles.icons}>
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
          </View>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;

    return joinSucceed ? (
      <View style={styles.fullView}>{this._renderRemoteVideos()}</View>
    ) : (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={60} color="#81b840" />
        <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
      </View>
    );
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;

    return (
      <FlatList
        data={peerIds}
        keyExtractor={(index) => index.toString()}
        numColumns={2}
        renderItem={({value, index, array}) => (
          <RtcRemoteView.SurfaceView
            key={index}
            style={styles.remote}
            uid={value}
            channelId={this.state.channelName}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        )}
      />
      // <ScrollView
      //   style={styles.remoteContainer}
      //   contentContainerStyle={{paddingHorizontal: 2.5}}
      //   horizontal={false}>
      //   {peerIds.map((value, index, array) => {
      //     return (
      //       <RtcRemoteView.SurfaceView
      //         key={index}
      //         style={styles.remote}
      //         uid={value}
      //         channelId={this.state.channelName}
      //         renderMode={VideoRenderMode.Hidden}
      //         zOrderMediaOverlay={true}
      //       />
      //     );
      //   })}
      // </ScrollView>
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
    flex: 1,
    position: 'absolute',
    marginVertical: 20,
  },
  remote: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 100,
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

export default connect(mapStateToProps, null)(AudienceScreen);
