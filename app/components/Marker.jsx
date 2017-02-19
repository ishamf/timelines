import React from 'react'
import {connect} from 'react-redux'

import {getCenterTime, getScreenRange, getHue} from '../state'

const Marker = ({centerTime, screenRange, time, topPos, label, hue}) => {
  return (
    <div className='marker' style={{
      color: `hsl(${hue}, 100%, 25%)`,
      left: `${100 * (time - centerTime + screenRange / 2) / screenRange}%`
    }}>
      <div className='marker-label' style={{
        color: `hsl(${hue}, 30%, 65%)`,
        top: topPos
      }}>
        {label}
      </div>
    </div>
  )
}

export default connect((state, props) => ({
  hue: getHue(state, props.label),
  screenRange: getScreenRange(state),
  centerTime: getCenterTime(state)
}))(Marker)
