import React from 'react'
import {connect} from 'react-redux'

import {getCenterTime, getScreenRange} from '../state'

const Marker = ({centerTime, screenRange, time, topPos, label}) => {
  return (
    <div className='marker' style={{
      left: `${100 * (time - centerTime + screenRange / 2) / screenRange}%`
    }}>
      <div className='marker-label' style={{
        top: topPos
      }}>
        {label}
      </div>
    </div>
  )
}

export default connect((state) => ({
  screenRange: getScreenRange(state),
  centerTime: getCenterTime(state)
}))(Marker)
