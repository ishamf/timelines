/* eslint-env browser */

import { createAction } from 'redux-actions'
import { getCount } from './state'

export const increment = () => (dispatch, getState) => {
  dispatch(replaceCount(getCount(getState()) + 1))
}

export const decrement = () => (dispatch, getState) => {
  dispatch(replaceCount(getCount(getState()) - 1))
}

const replaceCount = createAction('REPLACE_COUNT')
