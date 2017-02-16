import {fromJS} from 'immutable'

// Inital state
export const initialState = fromJS({
  count: 1
})

// Data getter functions
export function getCount (state) {
  return state.getIn(['count'])
}
