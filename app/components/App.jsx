import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {getTimelines, getScreenRange, getCenterTime, getMarkers} from '../state'
import moment from 'moment-timezone'

import Timeline from './Timeline'
import Marker from './Marker'

const scrollZoomSpeed = 0.001

import Select from 'react-select'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timezones: [],
      selecting: false,
      dragging: false,
      lastCenterTime: undefined,
      lastX: undefined
    }
  }

  render () {
    const {
      timelines, centerTime, screenRange, markers,
      replaceCenterTime, replaceScreenRange, replaceMouseTime, replaceTimelines
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
      if (this.state.selecting) return true

      const mouseLocationRatio = (e.clientX / window.innerWidth)
      const mouseLocationTime = mouseLocationRatio * screenRange + centerTime - screenRange / 2

      replaceMouseTime(mouseLocationTime)

      if (this.state.dragging) {
        const millisecondsMoved = 1.0 * screenRange * (e.clientX - this.state.lastX) / window.innerWidth

        replaceCenterTime(this.state.lastCenterTime - millisecondsMoved)
      }
    }

    const wheel = (e) => {
      if (this.state.selecting) return

      const linearDifference = e.deltaY * scrollZoomSpeed
      const mouseLocationRatio = (e.clientX / window.innerWidth)
      const mouseLocationTime = mouseLocationRatio * screenRange + centerTime - screenRange / 2
      const newScreenRange = Math.exp(Math.log(screenRange) + linearDifference)
      const newCenterTime = mouseLocationTime - mouseLocationRatio * newScreenRange + newScreenRange / 2

      replaceScreenRange(newScreenRange)
      replaceCenterTime(newCenterTime)
    }

    const selectChange = (values) => {
      this.setState({timezones: values})
      console.log(values)
      replaceTimelines(values.map(v => ({
        timezone: v.value
      })))
    }

    return (
      <div id='content' className='timelines-app'
        onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}
        onWheel={wheel}
      >

        <Select
          name='timezone'
          value={this.state.timezones}
          onChange={selectChange}
          options={moment.tz.names().map(tz => ({
            label: tz,
            value: tz
          }))}
          multi
          onFocus={() => { this.state.selecting = true }}
          onBlur={() => { this.state.selecting = false }}
          className='timezone-selector'
        />

        {timelines.map(timeline => (<Timeline timeline={timeline} />))}

        {markers.map(({time, label}) => <Marker time={time} label={label} topPos='50%' />)}

      </div>
    )
  }
}

export default connect((state) => ({
  markers: getMarkers(state),
  timelines: getTimelines(state),
  centerTime: getCenterTime(state),
  screenRange: getScreenRange(state)
}), Actions)(App)
