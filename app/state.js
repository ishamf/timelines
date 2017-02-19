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
        timezone: moment.tz.guess()
      }
    ],
    markers: [

    ]
  },
  view: {
    centerTime: moment().tz('UTC').valueOf(), // current time in ms
    screenRange: 1000 * 60 * 60 * 24 // one day in ms
  }
})

// Data getter functions
export function getScreenRange (state) {
  return state.getIn(['view', 'screenRange'])
}

export function getCenterTime (state) {
  return state.getIn(['view', 'centerTime'])
}

export function getTimelines (state) {
  return state.getIn(['model', 'timelines']).toJS()
}

export function reducer (state = initialState, {type, payload}) {
  switch (type) {
    case 'REPLACE_CENTER_TIME':
      return state.setIn(['view', 'centerTime'], payload)
    case 'REPLACE_SCREEN_RANGE':
      return state.setIn(['view', 'screenRange'], payload)
    default:
      return state
  }
}
