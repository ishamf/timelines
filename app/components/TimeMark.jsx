import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment-timezone'
import classNames from 'classnames'

import {getCenterTime, getScreenRange, getHue} from '../state'

const TimeMark = ({centerTime, screenRange, time, timezone, unit, marker, hue}) => {
  return (
    <div className={classNames({
      'timeline-time-mark': true,
      'mod-time': !marker,
      'mod-marker': marker
    })} style={{
      color: `hsl(${hue}, 30%, 65%)`,
      left: `${100 * (time - centerTime + screenRange / 2) / screenRange}%`
    }}>
      {moment.tz(time, 'UTC').tz(timezone).format(marker ? 'YYYY MMM Do hh:mm:ss A' : getOptimalDateFormat(unit))}
    </div>
  )
}

export default connect((state, props) => ({
  hue: getHue(state, props.marker || props.timezone),
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
