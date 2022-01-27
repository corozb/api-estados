import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import CrudTableRow from './CrudTableRow'

const CrudTable = () => {
  const { database: data } = useContext(AppContext)

  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Constelación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => <CrudTableRow key={el.id} el={el} />)
          ) : (
            <tr>
              <td colSpan='3'>Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable
