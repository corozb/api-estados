import { TYPES } from '../actions/actions'

export const initialState = {
  database: null,
}

export function crudReducer(state, action) {
  switch (action.type) {
    case TYPES.READ_ALL_DATA: {
      return {
        ...state,
        database: action.payload.map((data) => data),
      }
    }

    case TYPES.CREATE_DATA: {
      return {
        ...state,
        database: [...state.database, action.payload],
      }
    }

    case TYPES.DELETE_DATA: {
      const dataDelete = state.database.filter((item) => item.id !== action.payload)
      return {
        ...state,
        database: dataDelete,
      }
    }

    case TYPES.UPDATE_DATA: {
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
