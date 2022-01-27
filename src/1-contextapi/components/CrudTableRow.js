import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const CrudTableRow = ({ el }) => {
  const { setDataToEdit, deleteData } = useContext(AppContext)
  const { name, constellation, id } = el

  return (
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  )
}

export default CrudTableRow
