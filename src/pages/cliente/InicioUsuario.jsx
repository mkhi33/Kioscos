import React from 'react'
import LectorQr from '../../components/LectorQr'

const InicioUsuario = ({nombre}) => {
  return (
      <>
        <div className='bg-amber-500 p-2'>
            <img className='mr-3 h-16'  src='https://res.cloudinary.com/dicifr3km/image/upload/v1649704077/kioscos/Logo_1_ddimbp.svg' />    
        </div>
        <div className='flex flex-col mt-5'>
            <h1 className='text-amber-600 text-4xl font-bold text-center'>¡Bienvenido, {nombre} !</h1>
            <h1 className=' text-indigo-600 text-4xl font-bold text-center'>Nos alegra tenerte de nuevo</h1>
        </div>

        <div >
            <LectorQr />
        </div>


      </>
  )
}

export default InicioUsuario