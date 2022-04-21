import {useState, useEffect} from 'react'
import Mesa from '../../components/Mesa'
import useKioscosAuth from '../../hooks/useKioscosAuth'
import useKioscosRestaurante from '../../hooks/useKioscosRestaurante'
import axios from 'axios'
import ModalMesa from '../../components/ModalMesa'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Spinner from '../../components/Spinner'
const InicioRestaurante = () => {

    const { usuarioActual } = useKioscosAuth()
    const {  mesas, handleObtenerMesas } = useKioscosRestaurante()
    const [ modal, setModal ] = useState(false)
    const [ cargandoMesas, setCargandoMesas ] = useState(true)

    useEffect( () => {
        // Obtener las mesas
        if(usuarioActual && cargandoMesas){
            handleObtenerMesas(usuarioActual.id)
            setCargandoMesas(false)
            setModal(false)
            
        }
    }, [usuarioActual, cargandoMesas])





  return (
    <>
        <div className='bg-amber-500 w-full h-16 flex'>
            <img className='ml-3 h-10 mt-2 '  src='https://res.cloudinary.com/dicifr3km/image/upload/v1649704077/kioscos/Logo_1_ddimbp.svg' />    
            <div className="w-full md:block md:w-auto ml-auto mr-auto" id="mobile-menu">
                    <ul className="flex flex-row mt-4 gap-10">
                        <li className='text-black hover:text-white'>
                            <a href='#'>Inicio</a>
                        </li>
                        <li className='text-black hover:text-white'>
                            <a href='#'>Mesas</a>
                        </li>
                        <li className='text-black hover:text-white'>
                            <a href='#'>Ordenes</a>
                        </li>
                        
                    </ul>
                </div>
        
        </div>

        <div>

            <div className='flex flex-col mt-5'>
                <h1 className='text-amber-600 text-4xl font-bold text-center'>¡Bienvenido, {usuarioActual?.name} !</h1>
                <h1 className=' text-indigo-600 text-4xl font-bold text-center'>Estas son tus mesas registradas</h1>
            </div>

                    { cargandoMesas && <div className="ml-auto mr-auto"><Spinner  /></div>}
                <div className='container mx-auto gap-4 mt-5 grid grid-cols-4 w-full'>
                    {mesas.map( mesa => (
                        <Mesa key={mesa.number} mesa={mesa} setCargandoMesas={setCargandoMesas}/>
                    ))}

                </div>

            
        </div>
        <Box className='mt-5 flex flex-row justify-center' sx={{ '& > :not(style)': { m: 1 } }}>

            <Fab onClick={ () => setModal(true) } color="primary" aria-label="add">
                <AddCircleIcon style={{fontSize:"50px"}} />
            </Fab>
        </Box>
        <ModalMesa modal={modal} setModal={setModal} restaurantId={usuarioActual?.id} setCargandoMesas={setCargandoMesas} />
    </>
  )
}

export default InicioRestaurante