/* eslint-env browser */

import { createAction } from 'redux-actions'

export const replaceTimelines = createAction('REPLACE_TIMELINES')
export const replaceCenterTime = createAction('REPLACE_CENTER_TIME')
export const replaceScreenRange = createAction('REPLACE_SCREEN_RANGE')
export const replaceMouseTime = createAction('REPLACE_MOUSE_TIME')
export const replaceCurrentTime = createAction('REPLACE_CURRENT_TIME')
