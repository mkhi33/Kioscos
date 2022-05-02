import useKioscosAuth from '../../hooks/useKioscosAuth'
import LectorQr from '../../components/LectorQr'
import { useEffect, useState } from 'react'
import AvatarMenu from '../../components/AvatarMenu'

const InicioUsuario = ({nombre}) => {

  const { usuarioActual, handleCerrarSesion } = useKioscosAuth()
  const [ cerrarSesion, setCerrarSesion ] = useState(false)

  useEffect( () => {
    if(cerrarSesion){
        handleCerrarSesion()
    }
  }, [cerrarSesion])

  if( !usuarioActual ) {
    return null
  }

  
  
  return (
      <>

        <div className='bg-amber-500 p-2 flex flex-row'>
            <div className="w-1/2">
              <img className='mr-3 h-16'  src='https://res.cloudinary.com/dicifr3km/image/upload/v1649704077/kioscos/Logo_1_ddimbp.svg' /> 
            </div>
            <div className="flex w-1/2 justify-end">
              <AvatarMenu  usuario={usuarioActual} setCerrarSesion={setCerrarSesion} />   
            </div>
        </div>
        <div className='flex flex-col mt-5'>
            <h1 className='text-amber-600 text-4xl font-bold text-center'>¡Bienvenido, {usuarioActual.name} !</h1>
            <h1 className=' text-indigo-600 text-4xl font-bold text-center'>Nos alegra tenerte de nuevo</h1>
        </div>

        <div >
            <LectorQr />
        </div>


      </>
  )
}

export default InicioUsuario