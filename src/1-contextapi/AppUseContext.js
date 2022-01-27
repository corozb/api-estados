import { AppProvider } from './context/AppContext'
import React from 'react'
import CrudApi from './components/CrudApi'

function AppUseContext() {
  return (
    <AppProvider>
      <CrudApi />
    </AppProvider>
  )
}

export default AppUseContext
