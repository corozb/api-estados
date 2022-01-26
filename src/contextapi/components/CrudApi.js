import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import Loader from './Loader'
import Message from './Message'

const CrudApi = () => {
  const { database, loading, error } = useContext(AppContext)

  return (
    <div>
      <h2>CRUD API con Context API</h2>
      <article className='grid-1-2'>
        <CrudForm />
        {loading && <Loader />}
        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor='#dc3545' />}
        {database && <CrudTable />}
      </article>
    </div>
  )
}

export default CrudApi
