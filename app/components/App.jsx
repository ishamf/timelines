import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {getTimelines, getScreenRange, getCenterTime} from '../state'
import moment from 'moment-timezone'

import Timeline from './Timeline'

const scrollZoomSpeed = 0.001

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
    const {
      timelines, centerTime, screenRange,
      replaceCenterTime, replaceScreenRange
    } = this.props

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

        replaceCenterTime(this.state.lastCenterTime - millisecondsMoved)
      }
    }

    const wheel = (e) => {
      const linearDifference = e.deltaY * scrollZoomSpeed
      const mouseLocationRatio = (e.clientX / window.innerWidth)
      const mouseLocationTime = mouseLocationRatio * screenRange + centerTime - screenRange / 2
      const newScreenRange = Math.exp(Math.log(screenRange) + linearDifference)
      const newCenterTime = mouseLocationTime - mouseLocationRatio * newScreenRange + newScreenRange / 2

      replaceScreenRange(newScreenRange)
      replaceCenterTime(newCenterTime)
    }

    return (
      <div id='content' className='timelines-app'
        onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}
        onWheel={wheel}
      >
        centerTime: {moment(centerTime).tz('UTC').toISOString()} ({centerTime})
        <br />
        screenRange: {screenRange}

        {timelines.map(timeline => (<Timeline timeline={timeline} />))}
      </div>
    )
  }
}

export default connect((state) => ({
  timelines: getTimelines(state),
  centerTime: getCenterTime(state),
  screenRange: getScreenRange(state)
}), Actions)(App)
