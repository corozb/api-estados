import { useState, useEffect, createContext } from 'react'
import { helpHttp } from '../../helpers/helpHttp'

export const AppContext = createContext()

const api = helpHttp()
const url = 'http://localhost:5000/santos'

export const AppProvider = ({ children }) => {
  const [database, setDatabase] = useState(null)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(url).then((res) => {
      if (!res.err) {
        setDatabase(res)
        setError(null)
      } else {
        setDatabase(null)
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
        setDatabase([...database, res])
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
          const dataDelete = database.filter((item) => item.id !== id)

          setDatabase(dataDelete)
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
        const updateData = database.map((el) => (el.id === data.id ? data : el))
        setDatabase(updateData)
      } else {
        setError(res)
      }
    })
  }

  const data = {
    database,
    dataToEdit,
    setDataToEdit,
    error,
    loading,
    createData,
    updateData,
    deleteData,
  }

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>
}
