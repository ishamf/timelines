import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {getScreenRange, getCenterTime} from '../state'
import moment from 'moment-timezone'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dragging: false,
      lastCenterTime: undefined,
      lastX: undefined
    }
  }

  render () {
    const {centerTime, screenRange, replaceCenterTime} = this.props

    const mouseDown = (e) => {
      this.state.dragging = true
      this.state.lastX = e.clientX
      this.state.lastCenterTime = centerTime
    }

    const mouseUp = () => {
      this.state.dragging = false
      this.state.lastX = undefined
      this.state.centerTime = undefined
    }

    const mouseMove = (e) => {
      if (this.state.dragging) {
        const millisecondsMoved = 1.0 * screenRange * (e.clientX - this.state.lastX) / window.innerWidth

        console.log(millisecondsMoved)

        replaceCenterTime(this.state.lastCenterTime + millisecondsMoved)
      }
    }

    return (
      <div id='content' className="timelines-app" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
        centerTime: {moment(centerTime).tz('UTC').toISOString()}
        <br />
        screenRange: {screenRange}
      </div>
    )
  }
}

export default connect((state) => ({
  centerTime: getCenterTime(state),
  screenRange: getScreenRange(state)
}), Actions)(App)
