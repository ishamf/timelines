import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment-timezone'

import {getCenterTime, getScreenRange} from '../state'

import TimeMark from './TimeMark'

const Timeline = ({centerTime, screenRange, timeline: {timezone}}) => {
  const timeMarks = []

  const {unit, resolution} = getTimeMarkResolution(screenRange)

  const firstMarkTime = Math.floor((centerTime - screenRange / 2 + resolution) / resolution) * resolution

  const tm = moment.tz(firstMarkTime, 'UTC')

  while (tm.valueOf() < centerTime + screenRange / 2) {
    timeMarks.push(tm.valueOf())
    tm.add(resolution, 'ms')
  }

  console.log(centerTime)
  console.log(centerTime - screenRange / 2)
  console.log(unit)
  console.log(resolution)
  console.log(timeMarks)

  return (
    <div className='timeline'>
      <div className='timeline-timezone-label'>
        {timezone}
      </div>

      {timeMarks.map(timeMarkTime => (
        <TimeMark time={timeMarkTime} timezone={timezone} unit={unit} />
      ))}
    </div>
  )
}

export default connect((state) => ({
  screenRange: getScreenRange(state),
  centerTime: getCenterTime(state)
}))(Timeline)

// Utility functions to create time marks

function getTimeMarkResolution (screenRange) {
  // Try having around 1 marker every 300 pixels on screen
  const initialResolution = screenRange / (window.innerWidth / 300)

  // Get the closest resolution by time unit
  const timeUnitResolution = getClosest(timeUnits, initialResolution)

  // Make the initial resolution a multiply of that time unit
  const finalResolution = Math.round(initialResolution / timeUnitResolution) * timeUnitResolution

  return {
    unit: timeUnitNames[timeUnitResolution],
    resolution: finalResolution
  }
}

const timeUnitNames = {
  // eslint-disable-next-line no-useless-computed-key
  [1000]: 'second',
  [1000 * 15]: 'second',
  [1000 * 30]: 'second',
  [1000 * 60]: 'minute',
  [1000 * 60 * 5]: 'minute',
  [1000 * 60 * 10]: 'minute',
  [1000 * 60 * 20]: 'minute',
  [1000 * 60 * 60]: 'hour',
  [1000 * 60 * 60 * 3]: 'hour',
  [1000 * 60 * 60 * 6]: 'hour',
  [1000 * 60 * 60 * 12]: 'hour',
  [1000 * 60 * 60 * 24]: 'day',
  [1000 * 60 * 60 * 24 * 7]: 'week',
  [1000 * 60 * 60 * 24 * 30]: 'month',
  [1000 * 60 * 60 * 24 * 365]: 'year'
}

const timeUnits = Object.keys(timeUnitNames)

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
