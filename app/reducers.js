import {initialState} from './state'

import {fromJS} from 'immutable'

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'REPLACE_COUNT':
      return state.setIn(['count'], fromJS(payload))
    default:
      return state
  }
}
