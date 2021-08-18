import React, { Component } from 'react'

import { SHARE_ID } from '../../utils/settings'
export default class Window extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    const { role, uid } = this.props
    console.log('windows  this.props.role:', role, '     this.props.uid:', uid)
    let dom = document.querySelector(`#video-${uid}`)
    if (this.props.role === 'local') {
      dom && this.props.rtcEngine.setupLocalView(0, 0, dom)
      this.props.rtcEngine.setupLocalViewContentMode(0, 0, 1)
    } else if (this.props.role === 'localVideoSource') {
      console.log('localVideoSource-----')
      dom && this.props.rtcEngine.setupLocalView(3, 0, dom)
      this.props.rtcEngine.setupLocalViewContentMode(3, 0, 1)
    } else if (this.props.role === 'remote') {
      dom && this.props.rtcEngine.setupRemoteView(uid, 0, dom)
      this.props.rtcEngine.setupRemoteViewContentMode(uid, 0, 1)
    } else if (this.props.role === 'remoteVideoSource') {
      dom && this.props.rtcEngine.setupRemoteView(uid, 0, dom)
      this.props.rtcEngine.setupRemoteViewContentMode(String(SHARE_ID), 0, 1)
    }
  }

  render() {
    return (
      <div className='window-item'>
        <div className='video-item' id={'video-' + this.props.uid}></div>
      </div>
    )
  }
}
