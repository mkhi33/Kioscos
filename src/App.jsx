import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Landing from './pages/Landing'
import SigIn from './pages/SigIn';
import SignUp from './pages/SignUp';
import InicioUsuario from './pages/InicioUsuario';
import MenuUsuario from './pages/MenuUsuario';

import { KioscosClienteProvider } from './context/KioscosClienteProvider';


function App() {
  

  return (
    <KioscosClienteProvider>

      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={ <SigIn />} />
          <Route path='/signUp' element={ <SignUp />} />
          <Route path='/cliente' element={ <InicioUsuario />} />
          <Route path='/cliente/menu' element={ <MenuUsuario />} />
        </Routes>
      </Router>


    </KioscosClienteProvider>

  )
}

export default App
