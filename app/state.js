import {fromJS} from 'immutable'
import moment from 'moment-timezone'

// Inital state
export const initialState = fromJS({
  model: {
    timelines: [
      {
        timezone: 'UTC'
      },
      {
        timezone: 'Local'
      }
    ],
    markers: [

    ]
  },
  view: {
    centerTime: moment().tz('UTC').valueOf(), // current time in ms
    screenRange: 86400000 // one day in ms
  }
})

// Data getter functions
export function getScreenRange (state) {
  return state.getIn(['view', 'screenRange'])
}

export function getCenterTime (state) {
  return state.getIn(['view', 'centerTime'])
}

export function reducer (state = initialState, {type, payload}) {
  switch (type) {
    case 'REPLACE_CENTER_TIME':
      return state.setIn(['view', 'centerTime'], payload)
    default:
      return state
  }
}
