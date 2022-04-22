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
const Layout = ({children}) => {

  const [ mostrarSidebar, setMostrarSidebar ] = useState(true);
  const [ isRestaurant, setIsRestaurant ] = useState(false)
  const { usuarioActual } = useKioscoAuth();
  const { setModalCategoria, modalCategoria, cargandoCategorias} = useKioscosRestaurante();
  const handleClickBurguer = () => {
    setMostrarSidebar(!mostrarSidebar)

  } 

  useEffect( ()=> {
    if( usuarioActual?.rtn ){
      setIsRestaurant(true)
    }
  }, [usuarioActual])

  return (
    <>
      <div className='flex'>
        <div className="w-full md:w-full lg:w-4/12">
          <div className='flex flex-row'>
            <img className='ml-3 mt-2' src={'https://res.cloudinary.com/dicifr3km/image/upload/v1649704077/kioscos/Logo_1_ddimbp.svg'} style={{width:"50px", height:"50px"}}  alt="Imagen logotipo" />
            <div className='ml-auto p-4'>
              {
                mostrarSidebar ? 
                  <MenuOpenIcon onClick={handleClickBurguer} className='text-2xl cursor-pointer'/>
                : <MenuIcon onClick={handleClickBurguer} className='text-2xl cursor-pointer'/>
              }
            </div>  
          </div>

          <aside className={`${ mostrarSidebar ? 'w-full': 'hidden' }  overflow-scroll h-screen`}>
            <Sidebar  className="w-full"/>
            {isRestaurant && 
              (<Box className='mt-5 flex flex-row justify-center' sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab onClick={ () => setModalCategoria(true) } color="primary" aria-label="add">
                    <AddCircleIcon style={{fontSize:"50px"}} />
                </Fab>
              </Box>)
            }
          </aside>
        </div>
        
        <main className={`${ mostrarSidebar ? 'md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll': 'w-full'}`}>
          <div className="mt-5">
            { usuarioActual?.rtn ? <PasosRestaurante /> : <PasosCliente /> }
              {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )


}

export default Layout