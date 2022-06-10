import AudioMixing from './AudioMixing/AudioMixing'
import CameraAndScreenShare from './CameraAndScreenShare/CameraAndScreenShare'
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay'
import ContentInspect from './ContentInspect/ContentInspect'
import CreateDataStream from './CreateDataStream/CreateDataStream'
import DirectCdnStreaming from './DirectCdnStreaming/DirectCdnStreaming'
import LocalVideoTranscoder from './LocalVideoTranscoder/LocalVideoTranscoder'
import MediaPlayer from './MediaPlayer/MediaPlayer'
import MultipleChannel from './MultipleChannel/MultipleChannel'
import RhythmPlayer from './RhythmPlayer/RhythmPlayer'
import ScreenShare from './ScreenShare/ScreenShare'
import SendMetaData from './SendMetaData/SendMetaData'
import SetEncryption from './SetEncryption/SetEncryption'
import SetLiveTranscoding from './SetLiveTranscoding/SetLiveTranscoding'
import SpatialAudio from './SpatialAudio/SpatialAudio'
import TakeSnapshot from './TakeSnapshot/TakeSnapshot'
import VirtualBackground from './VirtualBackground/VirtualBackground'
import VoiceChanger from './VoiceChanger/VoiceChanger'

const advanceRoute = [
  {
    path: '/CameraAndScreenShare',
    component: CameraAndScreenShare,
    title: 'CameraAndScreenShare',
  },
  {
    path: '/DirectCdnStreaming',
    component: DirectCdnStreaming,
    title: 'DirectCdnStreaming',
  },
  {
    path: '/LocalVideoTranscoder',
    component: LocalVideoTranscoder,
    title: 'LocalVideoTranscoder',
  },
  {
    path: '/SendMetaData',
    component: SendMetaData,
    title: 'SendMetaData',
  },
  {
    path: '/RhythmPlayer',
    component: RhythmPlayer,
    title: 'RhythmPlayer',
  },
  {
    path: '/ContentInspect',
    component: ContentInspect,
    title: 'ContentInspect',
  },
  {
    path: '/SpatialAudio',
    component: SpatialAudio,
    title: 'SpatialAudio',
  },
  {
    path: '/VirtualBackground',
    component: VirtualBackground,
    title: 'VirtualBackground',
  },
  {
    path: '/TakeSnapshot',
    component: TakeSnapshot,
    title: 'TakeSnapshot',
  },
  {
    path: '/ScreenShare',
    component: ScreenShare,
    title: 'ScreenShare',
  },
  {
    path: '/ChannelMediaRelay',
    component: ChannelMediaRelay,
    title: 'ChannelMediaRelay',
  },
  {
    path: '/CreateDataStream',
    component: CreateDataStream,
    title: 'CreateDataStream',
  },
  {
    path: '/MultipleChannel',
    component: MultipleChannel,
    title: 'MultipleChannel',
  },
  {
    path: '/AudioMixing',
    component: AudioMixing,
    title: 'AudioMixing',
  },
  {
    path: '/SetEncryption',
    component: SetEncryption,
    title: 'SetEncryption',
  },
  {
    path: '/VoiceChanger',
    component: VoiceChanger,
    title: 'VoiceChanger',
  },
  {
    path: '/SetLiveTranscoding',
    component: SetLiveTranscoding,
    title: 'SetLiveTranscoding',
  },
  {
    path: '/MediaPlayer',
    component: MediaPlayer,
    title: 'MediaPlayer',
  },
]

export default advanceRoute
