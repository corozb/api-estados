import React from 'react'
import { Provider } from 'react-redux'
import CrudApi from './components/CrudApi'
import store from './store'

function AppRedux() {
  return (
    <Provider store={store}>
      <CrudApi />
    </Provider>
  )
}

export default AppRedux
