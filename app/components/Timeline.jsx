import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment-timezone'

import {getCenterTime, getScreenRange, getMarkers, getHue} from '../state'

import TimeMark from './TimeMark'

const Timeline = ({centerTime, screenRange, timeline: {timezone}, markers, hue}) => {
  const timeMarks = []

  const markerTimes = markers
    .filter(({time, controlled}) => !controlled && Math.abs(time - centerTime) < screenRange / 2)
    .map(({time}) => time)

  const {unit: [count, unit], resolution} = getTimeMarkResolution(screenRange)

  const firstMarkTime = Math.floor((centerTime - screenRange / 2 + resolution) / resolution) * resolution

  const tm = moment.tz(firstMarkTime, 'UTC').startOf(unit)

  while (tm.valueOf() < centerTime + screenRange / 2) {
    timeMarks.push(tm.valueOf())
    tm.add(count, unit).startOf(unit)
  }

  markerTimes.forEach(mt => {
    if (timeMarks.length > 0) {
      const c = getClosest(timeMarks, mt)
      timeMarks.splice(timeMarks.indexOf(c), 1)
    }
  })

  return (
    <div className='timeline' style={{color: `hsl(${hue}, 100%, 25%)`}}>
      <div className='timeline-timezone-label'>
        {timezone}
      </div>

      {timeMarks.map(timeMarkTime => (
        <TimeMark time={timeMarkTime} timezone={timezone} unit={unit} />
      ))}

      {markers.map(({time, label}) => (<TimeMark time={time} timezone={timezone} unit={unit} marker={label} />))}

    </div>
  )
}

export default connect((state, props) => ({
  hue: getHue(state, props.timeline.timezone),
  markers: getMarkers(state),
  screenRange: getScreenRange(state),
  centerTime: getCenterTime(state)
}))(Timeline)

// Utility functions to create time marks

function getTimeMarkResolution (screenRange) {
  // Try having around 1 marker every 300 pixels on screen
  const initialResolution = screenRange / (window.innerWidth / 300)

  // Get the closest resolution by time unit
  const timeUnitResolution = getClosest(timeUnits, initialResolution)

  return {
    unit: timeUnitNames[timeUnitResolution],
    resolution: timeUnitResolution
  }
}

const timeUnitNames = {
  // eslint-disable-next-line no-useless-computed-key
  [1000]: [1, 'second'],
  [1000 * 15]: [15, 'second'],
  [1000 * 30]: [30, 'second'],
  [1000 * 60]: [1, 'minute'],
  [1000 * 60 * 5]: [5, 'minute'],
  [1000 * 60 * 10]: [10, 'minute'],
  [1000 * 60 * 20]: [20, 'minute'],
  [1000 * 60 * 60]: [1, 'hour'],
  [1000 * 60 * 60 * 3]: [3, 'hour'],
  [1000 * 60 * 60 * 6]: [6, 'hour'],
  [1000 * 60 * 60 * 12]: [12, 'hour'],
  [1000 * 60 * 60 * 24]: [1, 'day'],
  [1000 * 60 * 60 * 24 * 7]: [1, 'week'],
  [1000 * 60 * 60 * 24 * 28]: [1, 'month'],
  [1000 * 60 * 60 * 24 * 90]: [1, 'quarter'],
  [1000 * 60 * 60 * 24 * 365]: [1, 'year'],
  [1000 * 60 * 60 * 24 * 365 * 10]: [10, 'year'],
  [1000 * 60 * 60 * 24 * 365 * 100]: [100, 'year']
}

const timeUnits = Object.keys(timeUnitNames).map(x => parseInt(x))

function getClosest (targets, x) {
  let closest = targets[0]
  let range = Math.abs(closest - x)

  targets.forEach(target => {
    const currentRange = Math.abs(target - x)
    if (currentRange < range) {
      closest = target
      range = currentRange
    }
  })

  return closest
}
