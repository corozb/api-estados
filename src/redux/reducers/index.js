import { combineReducers } from 'redux'
import { crudReducer } from './crudReducer'

const reducers = combineReducers({
  crud: crudReducer,
})

export default reducers
