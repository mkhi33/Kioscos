import {useEffect } from 'react'
import { saveAs } from 'file-saver'
import axios from 'axios'
import { toast } from 'react-toastify'
const Mesa = ({ mesa, setCargandoMesas }) => {

    
    const handleDescargarQr = () => {
        saveAs(mesa.qr, `mesa_${mesa.number}.jpg`)
    }

    const handleEliminar = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/mesas/${mesa.id}`).then( res => {
            toast.success('Mesa eliminada correctamente')
            setCargandoMesas(true)
        }, err => {
            toast.error('Error al eliminar la mesa')
        })

    }
  return (
        <div className='flex'>
            <div className='container mx-auto bg-indigo-600 border rounded-3xl '>
                <p className='text-white w-full text-center mt-4 mb-4'>Mesa {mesa.number}</p>   
        
                <div>

                    <div className='bg-white border rounded-2xl w-11/12 ml-auto mr-auto p-10 flex flex-row '>
                        <div className='ml-auto mr-auto'> 
                            <img  src={mesa.qr} /> 

                        </div>
                    </div>

                    <div className='flex flex-row justify-center my-3 gap-4'>
                        <button onClick={handleEliminar} className='bg-red-600 hover:bg-red-500 p-2 text-white rounded' >Eliminar</button>
                        <button onClick={ handleDescargarQr } className='bg-green-600 hover:bg-green-500 p-2 text-white rounded' >Descargar</button>

                    </div>
                </div>

                   
            </div>
        </div>
  )
}

export default Mesa