import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from 'components/App'
import moment from 'moment-timezone'

import {replaceCurrentTime} from './actions'

import {reducer, initialState} from './state'

const storeInitialData = module.hot && module.hot.data && module.hot.data.counter || initialState

const store = createStore(reducer, storeInitialData, applyMiddleware(thunk))

function timeUpdater () {
  const ctime = moment().startOf('second')
  store.dispatch(replaceCurrentTime(ctime.tz('UTC').valueOf()))
  setTimeout(timeUpdater, ctime.add(1, 'second').valueOf() - moment().valueOf())
}

setTimeout(timeUpdater, 1000)

if (module.hot) {
  module.hot.accept('./state', () => {
    store.replaceReducer(require('./state').reducer)
  })
  module.hot.accept()

  module.hot.dispose((data) => {
    data.counter = store.getState()
    ;[].slice.apply(document.querySelector('#app').children).forEach(function (c) { c.remove() })
  })
}

const load = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  )
}

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load)
} else {
  load()
}
