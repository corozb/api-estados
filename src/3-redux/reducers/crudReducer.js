import { CREATE_DATA, DELETE_DATA, READ_ALL_DATA, UPDATE_DATA } from '../types'

export const initialState = {
  database: [],
}

export function crudReducer(state = initialState, action) {
  switch (action.type) {
    case READ_ALL_DATA: {
      return {
        ...state,
        database: action.payload.map((data) => data),
      }
    }

    case CREATE_DATA: {
      return {
        ...state,
        database: [...state.database, action.payload],
      }
    }

    case DELETE_DATA: {
      const dataDelete = state.database.filter((item) => item.id !== action.payload)
      return {
        ...state,
        database: dataDelete,
      }
    }

    case UPDATE_DATA: {
      let dataUpdated = state.database.map((el) => (el.id === action.payload.id ? action.payload : el))

      return {
        ...state,
        database: dataUpdated,
      }
    }

    default:
      return state
  }
}
