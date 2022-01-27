import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'

import { helpHttp } from '../../helpers/helpHttp'

import { TYPES } from '../actions/actions'
import { crudReducer, initialState } from '../reducers/crudReducer'
import CrudForm from '../../components/CrudForm'
import CrudTable from '../../components/CrudTable'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const api = helpHttp()
const url = 'http://localhost:5000/santos'

const CrudApi = () => {
  const navigate = useNavigate()

  const [state, dispatch] = useReducer(crudReducer, initialState)
  const { database } = state

  const [dataToEdit, setDataToEdit] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(url).then((res) => {
      if (!res.err) {
        dispatch({ type: TYPES.READ_ALL_DATA, payload: res })
      } else {
        dispatch({ type: TYPES.NO_DATA })
        setError(res)
      }
      setLoading(false)
    })
  }, [])

  const createData = (data) => {
    data.id = Date.now()
    const options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    }

    api.post(url, options).then((res) => {
      if (!res.err) {
        dispatch({ type: TYPES.CREATE_DATA, payload: res })
      } else {
        setError(res)
      }
    })
  }

  const deleteData = (id) => {
    const isDelete = window.confirm(`¿Estás seguro de eliminar el registro con el id '${id}'?`)

    if (isDelete) {
      const endpoint = `${url}/${id}`
      const options = {
        headers: { 'content-type': 'application/json' },
      }

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          dispatch({ type: TYPES.DELETE_DATA, payload: id })
        } else {
          setError(res)
        }
      })
    } else {
      return
    }
  }

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`

    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    }

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        //let newData = db.map((el) => (el.id === data.id ? data : el));
        //setDb(newData)
        dispatch({ type: TYPES.UPDATE_DATA, payload: data })
      } else {
        setError(res)
      }
    })
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>back</button>

      <h2>CRUD API con useReducer</h2>
      <article className='grid-1-2'>
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor='#dc3545' />}
        {database && <CrudTable data={database} deleteData={deleteData} setDataToEdit={setDataToEdit} />}
      </article>
    </div>
  )
}

export default CrudApi
