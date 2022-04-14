import {useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from '../components/FooterLanding'
import Pasos from '../components/Pasos'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
const Layout = ({children}) => {

  const [ mostrarSidebar, setMostrarSidebar ] = useState(true);

  const handleClickBurguer = () => {
    setMostrarSidebar(!mostrarSidebar)

  } 

  return (
    <div>

        <div className='flex flex-row md:w-4/12 xl:w-1/4 2xl:w-1/5'>
          
          <img className='ml-3 mt-2' src={'https://res.cloudinary.com/dicifr3km/image/upload/v1649704077/kioscos/Logo_1_ddimbp.svg'} style={{width:"50px", height:"50px"}}  alt="Imagen logotipo" />
          <div className='ml-auto p-4'>
            {
              mostrarSidebar ? 
                <MenuOpenIcon onClick={handleClickBurguer} className='text-2xl cursor-pointer'/>
              : <MenuIcon onClick={handleClickBurguer} className='text-2xl cursor-pointer'/>
            }
          </div>
        </div>

        <div className="md:flex">
          <aside className={`${ mostrarSidebar ? 'md:w-4/12 xl:w-1/4 2xl:w-1/5': 'hidden' } `}>

            <Sidebar />
          </aside>

          <main className={`${ mostrarSidebar ? 'md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll': 'w-full'}`}>
            <div className="p-10">
                <Pasos />
                {children}
            </div>
          </main>

        </div>

        <Footer />
    </div>
  )
}

export default Layout