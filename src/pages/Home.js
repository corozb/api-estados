import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>Api Request</h1>
      <p>I use this repo to learn about make api request using diferents kind of hooks to manage state.</p>
      <ol style={{ textAlign: 'left', paddingLeft: '60px' }}>
        <li>
          <Link to='/context'>Context Api</Link>
        </li>
        <li>
          <Link to='/use-reducer'>useReducer</Link>
        </li>
        <li>
          <Link to='/redux'>Redux</Link>
        </li>
      </ol>
    </>
  )
}

export default Home
