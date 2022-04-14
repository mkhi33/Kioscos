import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Landing from './pages/Landing'
import SigIn from './pages/SigIn';
import SignUp from './pages/SignUp';
import InicioUsuario from './pages/InicioUsuario';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={ <SigIn />} />
        <Route path='/signUp' element={ <SignUp />} />
        <Route path='/cliente' element={ <InicioUsuario />} />
      </Routes>
    </Router>

  )
}

export default App
