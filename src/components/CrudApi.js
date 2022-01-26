import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { helpHttp } from '../helpers/helpHttp'
import { readAllAction, noAction, createAction, updateAction, deleteAction } from '../redux/actions/actions'

import CrudForm from '../components/CrudForm'
import CrudTable from '../components/CrudTable'
import Loader from '../components/Loader'
import Message from '../components/Message'

const api = helpHttp()
const url = 'http://localhost:5000/santos'

const CrudApi = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { database } = state.crud

  const [dataToEdit, setDataToEdit] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(url).then((res) => {
      if (!res.err) {
        dispatch(readAllAction(res))
      } else {
        dispatch(noAction)
        setError(res)
      }
      setLoading(false)
    })
  }, [dispatch])

  const createData = (data) => {
    data.id = Date.now()
    const options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    }

    api.post(url, options).then((res) => {
      if (!res.err) {
        dispatch(createAction(data))
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
          dispatch(deleteAction(id))
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
        dispatch(updateAction(data))
      } else {
        setError(res)
      }
    })
  }

  return (
    <div>
      <h2>CRUD API con Redux</h2>
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
