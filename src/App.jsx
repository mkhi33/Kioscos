import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  Landing from './pages/Landing'
import SigIn from './pages/SigIn';
import SignUp from './pages/cliente/SignUp';
import InicioUsuario from './pages/cliente/InicioUsuario';
import MenuUsuario from './pages/cliente/MenuUsuario';
import ResumenUsuario from './pages/cliente/ResumenUsuario';
import TotalCliente from './pages/cliente/TotalCliente';

import { KioscosAuthProvider } from './context/KioscosAuthProvider';
import { KioscosClienteProvider } from './context/KioscosClienteProvider';
function App() {
  
  return (
    
    <Router>
          <KioscosAuthProvider>
            <KioscosClienteProvider>
            <Routes>
                <Route path="*" element={<>404 No encontrado</>} />
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={ <SigIn />} />
                <Route path='/login/:token' element={ <SigIn />} />
                <Route path='/signUp' element={ <SignUp />} />
                <Route path='/cliente' element={ <InicioUsuario />} />
                <Route path='/cliente/menu' element={ <MenuUsuario />} />
                <Route path='/cliente/resumen' element={ <ResumenUsuario />} />
                <Route path='/cliente/total' element={ <TotalCliente />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
            </KioscosClienteProvider>
          </KioscosAuthProvider>
        </Router>


  )
}

export default App
