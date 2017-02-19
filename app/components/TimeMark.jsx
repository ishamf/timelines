import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment-timezone'

import {getCenterTime, getScreenRange} from '../state'

const TimeMark = ({centerTime, screenRange, time, timezone, unit}) => {
  return (
    <div className='timeline-time-mark mod-time' style={{
      left: `${100 * (time - centerTime + screenRange / 2) / screenRange}%`
    }}>
      {moment.tz(time, 'UTC').tz(timezone).format(getOptimalDateFormat(unit))}
    </div>
  )
}

export default connect((state) => ({
  screenRange: getScreenRange(state),
  centerTime: getCenterTime(state)
}))(TimeMark)

// Utility functions
function getOptimalDateFormat (unit) {
  switch (unit) {
    case 'second': return 'hh:mm:ss A'
    case 'minute': return 'hh:mm A'
    case 'hour': return 'MMM Do hh:mm A'
    case 'day': return 'MMM Do'
    case 'week': return 'MMM Do'
    case 'month': return 'YYYY MMM'
    case 'quarter': return 'YYYY MMM'
    case 'year': return 'YYYY'
    default: return 'YYYY MMM Do'
  }
}
