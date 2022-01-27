import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AppUseContext from '../1-contextapi/AppUseContext'
import AppReducer from '../2-use-reducer/AppReducer'
import AppRedux from '../3-redux/AppRedux'

const AppRoutes = () => (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='context' element={<AppUseContext />} />
        <Route path='use-reducer' element={<AppReducer />} />
        <Route path='redux' element={<AppRedux />} />
      </Routes>
    </Router>
  </>
)

export default AppRoutes
