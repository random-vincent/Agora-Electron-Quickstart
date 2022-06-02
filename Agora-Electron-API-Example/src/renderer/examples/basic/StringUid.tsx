import creteAgoraRtcEngine, {
  ClientRoleType,
  IAudioDeviceManagerImpl,
  IRtcEngine,
  IRtcEngineEx,
  RtcConnection,
  RtcEngineExImplInternal,
  RtcStats,
  UserOfflineReasonType,
} from 'agora-electron-sdk'
import { Card, List } from 'antd'
import { Component } from 'react'
import DropDownButton from '../component/DropDownButton'
import JoinChannelBar from '../component/JoinChannelBar'
import { AudioProfileList, AudioScenarioList } from '../config'
import config from '../config/agora.config'
import styles from '../config/public.scss'
import { configMapToOptions } from '../util'

interface User {
  isMyself: boolean
  uid: number
}

interface Device {
  deviceId: string
  deviceName: string
}
interface State {
  audioRecordDevices: Device[]
  audioProfile: number
  audioScenario: number
  allUser: User[]
  isJoined: boolean
}

export default class StringUid extends Component<State> {
  rtcEngine?: IRtcEngineEx & IRtcEngine & RtcEngineExImplInternal

  audioDeviceManager: IAudioDeviceManagerImpl

  state: State = {
    audioRecordDevices: [],
    audioProfile: AudioProfileList.SpeechStandard,
    audioScenario: AudioScenarioList.Standard,
    allUser: [],
    isJoined: false,
  }

  componentDidMount() {
    this.getRtcEngine().enableVideo()
    this.getRtcEngine().enableAudio()
    this.audioDeviceManager = new IAudioDeviceManagerImpl()

    this.setState({
      audioRecordDevices:
        this.audioDeviceManager.enumerateRecordingDevices() as any,
    })
    this.getRtcEngine().registerEventHandler(this)
  }

  componentWillUnmount() {
    this.rtcEngine?.leaveChannel()
    this.rtcEngine?.release()
  }

  getRtcEngine() {
    if (!this.rtcEngine) {
      this.rtcEngine = creteAgoraRtcEngine()
      //@ts-ignore
      window.rtcEngine = this.rtcEngine
      const res = this.rtcEngine.initialize({ appId: config.appID })
      console.log('initialize:', res)
    }

    return this.rtcEngine
  }

  onJoinChannelSuccessEx(
    { channelId, localUid }: RtcConnection,
    elapsed: number
  ): void {
    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser]
    newAllUser.push({ isMyself: true, uid: localUid })
    this.setState({
      isJoined: true,
      allUser: newAllUser,
    })
  }

  onUserJoinedEx(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void {
    console.log(
      'onUserJoinedEx',
      'connection',
      connection,
      'remoteUid',
      remoteUid
    )

    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser]
    newAllUser.push({ isMyself: false, uid: remoteUid })
    this.setState({
      allUser: newAllUser,
    })
  }

  onUserOffline(uid: number, reason: UserOfflineReasonType): void {
    console.log(`onUserOffline ${uid}`)

    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser.filter((obj) => obj.uid !== uid)]
    this.setState({
      allUser: newAllUser,
    })
  }

  onLeaveChannelEx(connection: RtcConnection, stats: RtcStats): void {
    this.setState({
      isJoined: false,
      allUser: [],
    })
  }

  onError(err: number, msg: string): void {
    console.error(err, msg)
  }

  setAudioProfile = () => {
    const { audioProfile, audioScenario } = this.state
    this.rtcEngine?.setAudioProfile(audioProfile, audioScenario)
  }

  renderItem = ({ isMyself, uid }) => {
    return (
      <List.Item>
        <Card title={`${isMyself ? 'Local' : 'Remote'} `}>Uid: {uid}</Card>
      </List.Item>
    )
  }

  renderRightBar = () => {
    const { audioRecordDevices: audioDevices } = this.state
    return (
      <div className={styles.rightBar}>
        <div>
          <DropDownButton
            options={configMapToOptions(AudioProfileList)}
            onPress={(res) =>
              this.setState({ audioProfile: res.dropId }, this.setAudioProfile)
            }
            title='Audio Profile'
          />
          <DropDownButton
            options={configMapToOptions(AudioScenarioList)}
            onPress={(res) =>
              this.setState({ audioScenario: res.dropId }, this.setAudioProfile)
            }
            title='Audio Scenario'
          />
          <DropDownButton
            title='Microphone'
            options={audioDevices.map((obj) => {
              const { deviceId, deviceName } = obj
              return { dropId: deviceId, dropText: deviceName, ...obj }
            })}
            onPress={(res) => {
              this.audioDeviceManager.setRecordingDevice(res.dropId)
            }}
          />
        </div>
        <JoinChannelBar
          onPressJoin={(channelId) => {
            const rtcEngine = this.getRtcEngine()
            rtcEngine.disableVideo()
            rtcEngine.enableAudio()
            rtcEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster)
            const stringUid = `test-${Number(
              `${new Date().getTime()}`.slice(7)
            )}}`
            rtcEngine.joinChannelWithUserAccount(
              config.token,
              channelId,
              stringUid
            )
          }}
          onPressLeave={() => {
            this.getRtcEngine().leaveChannel()
          }}
        />
      </div>
    )
  }

  render() {
    const { isJoined, allUser } = this.state
    return (
      <div className={styles.screen}>
        <div className={styles.content}>
          {isJoined && (
            <List
              style={{ width: '100%' }}
              grid={{ gutter: 16, column: 4 }}
              dataSource={allUser}
              renderItem={this.renderItem}
            />
          )}
        </div>
        {this.renderRightBar()}
      </div>
    )
  }
}
