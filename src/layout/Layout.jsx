import {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Footer from '../components/FooterLanding'
import PasosCliente from '../components/PasosCliente'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import useKioscoAuth from '../hooks/useKioscosAuth'
import useKioscosRestaurante from '../hooks/useKioscosRestaurante'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import PasosRestaurante from '../components/PasosRestaurante'
import { esMovil } from '../helpers'
import { useNavigate, useLocation } from 'react-router-dom';
const Layout = ({children}) => {

  const [ mostrarSidebar, setMostrarSidebar ] = useState(true);
  const [ isRestaurant, setIsRestaurant ] = useState(false)
  const { usuarioActual } = useKioscoAuth();
  const { setModalCategoria, modalCategoria, cargandoCategorias} = useKioscosRestaurante();
  const [ idRestaurante, setIdRestaurante ] = useState(-1);
  const [ mostrarMain, setMostrarMain ] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const handleClickBurguer = () => {
    setMostrarSidebar(!mostrarSidebar)

  } 

  useEffect( () => {
    if( esMovil() && !location.pathname.split("/").includes('menu') ) {
      setMostrarMain(true)
    }
  }, [])

  useEffect( ()=> {
    if( usuarioActual?.rtn ){
      setIsRestaurant(true)
      setIdRestaurante(usuarioActual.id)
    }else {

    }
  }, [usuarioActual])



  const handleClickInicio = () => {
    if( usuarioActual.rtn ) {
      navigate('/restaurante')
    }else {
      navigate('/cliente')

    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row mt-2">

        <div className="w:full lg:w-3/12 flex flex-row">
         <div className="cursor-pointer" onClick={handleClickInicio}>
            <img  className='ml-3 mt-2' src={'https://res.cloudinary.com/dicifr3km/image/upload/v1649704077/kioscos/Logo_1_ddimbp.svg'} style={{width:"50px", height:"50px"}}  alt="Imagen logotipo" />
          </div> 
        
            <div className='ml-auto pr-2'>
              {
                mostrarSidebar ? 
                  <MenuOpenIcon onClick={handleClickBurguer} className='text-2xl cursor-pointer'/>
                : <MenuIcon onClick={handleClickBurguer} className='text-2xl cursor-pointer'/>
              }
            </div>  
        </div>
        <div className="w-full lg:w-9/12">
          <div className="flex pl-2">

            <div className="w-full lg:w-11/12">
              { isRestaurant ? <PasosRestaurante /> : <PasosCliente /> }
            </div>
          </div>
        </div>

      </div>  

      <div className='flex flex-col lg:flex-row'>
        <aside className={`${ mostrarSidebar && !mostrarMain ? 'w-full lg:w-3/12 overflow-y-scroll h-screen': 'hidden' }`}>
          <Sidebar restaurantId={ idRestaurante }  className="w-full"/>
          {isRestaurant && 
            (<Box className='mt-5 flex flex-row justify-center' sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab onClick={ () => setModalCategoria(true) } color="primary" aria-label="add">
                  <AddCircleIcon style={{fontSize:"50px"}} />
              </Fab>
            </Box>)
          }
        </aside>

        <main className={`${ mostrarSidebar && !mostrarMain ? 'w-full md:w-8/12 lg:w-9/12 lg:h-screen lg:overflow-auto hidden lg:block': 'w-full'}`}>
      
          <div className="flex  mt-5  mx-5">
              {children}
          </div>
        </main>

      </div>
        <Footer />


    </div>
  )


}

export default Layout