import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Landing from './pages/Landing'
import SigIn from './pages/SigIn';
import SignUp from './pages/SignUp';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={ <SigIn />} />
        <Route path='/signUp' element={ <SignUp />} />
      </Routes>
    </Router>

  )
}

export default App
