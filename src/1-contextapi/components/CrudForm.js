import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'

const initialForm = {
  name: '',
  constellation: '',
  id: null,
}

const CrudForm = () => {
  const { createData, updateData, dataToEdit, setDataToEdit } = useContext(AppContext)

  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.constellation) {
      alert('Datos incompletos')
      return
    }

    if (form.id === null) {
      createData(form)
    } else {
      updateData(form)
    }

    handleReset()
  }

  const handleReset = (e) => {
    setForm(initialForm)
    setDataToEdit(null)
  }

  console.log(dataToEdit)

  return (
    <div>
      <h3>{dataToEdit ? 'Editar' : 'Agregar'}</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Nombre' onChange={handleChange} value={form.name} />
        <input
          type='text'
          name='constellation'
          placeholder='Constelación'
          onChange={handleChange}
          value={form.constellation}
        />
        <input type='submit' value={dataToEdit ? 'Actualizar' : 'Enviar'} />
        <input type='reset' value='Limpiar' onClick={handleReset} />
      </form>
    </div>
  )
}

export default CrudForm