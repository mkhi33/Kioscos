import React from 'react'
import Layout from '../layout/Layout'
import useKioscosCliente from '../hooks/useKioscosCliente'
import { formatearDinero } from '../helpers'
import ModalProducto from '../components/ModalProducto'
const ResumenUsuario = () => {


    const {  pedido, handleEditarCantidades, handleEliminarProducto } = useKioscosCliente();

    // cantidad, categorieId, id, image, name, price

    

  return (
 
    <Layout>
        <h1 className='text-4xl font-black'>Resumen</h1>
        <p className='text-2xl my-10'>{`Juan `} Revisa tu pedido  </p>
        <div className="flex  flex-col lg:flex-col gap-3">
            {pedido.map( producto => (
                <div 
                    key={producto.id}
                    className="flex flex-row gap-10 mt-5"
                >
                    <div className='w-full lg:w-1/4'>
                        < img src={`../../assets/img/${producto.image}`}/>
                    </div>
                    <div className='w-ful lg:w-2/4 flex flex-col gap-2'>
                        <h1 className='text-4xl font-bold'>{producto.name}</h1>   
                        <span className='text-2xl'>cantidad: {producto.cantidad}</span> 
                        <span className='text-amber-500 font-bold'>Precio: {formatearDinero(producto.price)}</span>
                        <span className='text-2xl'>Subtotal: {formatearDinero(producto.price * producto.cantidad)}</span>
                    </div>

                    <div className='w-full lg:w-1/4 flex flex-col gap-2'>
                        <button onClick={ () => handleEditarCantidades(producto.id)} className='p-2 text-white bg-indigo-700 rounded hover:bg-indigo-800'>Editar</button>    
                        <button onClick={ () => handleEliminarProducto(producto.id)} className='p-2 text-white bg-red-600 rounded hover:bg-red-700'>Eliminar</button>    
                    </div>
                </div>

            ))}

        </div>

        <ModalProducto />

    </Layout>

  )
}

export default ResumenUsuario