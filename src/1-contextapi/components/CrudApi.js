import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const CrudApi = () => {
  const { database, loading, error } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')}>back</button>
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
