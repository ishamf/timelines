import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCount } from '../state'
import * as Actions from '../actions'

const BaseCounter = ({ count, increment, decrement }) => (
  <div>
    <h5><a href='https://redux.js.org/'>Redux</a> &amp; <a href='https://facebook.github.io/react/'>React</a> Counter</h5>
    <p>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
    </p>
  </div>
)

BaseCounter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { count: getCount(state) }
}

export default connect(mapStateToProps, Actions)(BaseCounter)
