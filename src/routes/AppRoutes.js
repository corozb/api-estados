import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AppRedux from '../redux/AppRedux'

const AppRoutes = () => (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='context' element={<StateApp />} />
        {/* <Route path='use-reducer' element={<ReducerApp />} /> */}
        <Route path='redux' element={<AppRedux />} />
      </Routes>
    </Router>
  </>
)

export default AppRoutes
