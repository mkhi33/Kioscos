import React from 'react'
import Layout from '../../layout/Layout'
import useKioscosCliente from '../../hooks/useKioscosCliente'
import { formatearDinero } from '../../helpers'
import useKioscoAuth from '../../hooks/useKioscosAuth'
const TotalCliente = () => {
    const { total, pedido } = useKioscosCliente();
    const { usuarioActual } = useKioscoAuth()

    const handleEnviarPedido = () => {
        console.log(pedido)
    }
  return (
    <Layout>
      <div className="w-full">
        <h1 className='text-4xl font-black'>Total y confirmar pedido</h1>
        <p className='text-2xl my-10'>{usuarioActual.name}, confirma tu pedido</p>
        <div className="flex  flex-col  gap-3">
          <h1><span className='text-4xl font-bold'>Total a pagar:</span> <span className='text-amber-500 text-2xl text-bold'>{formatearDinero(total)}</span></h1>
          <button onClick={handleEnviarPedido} className='bg-indigo-500 text-white p-2 rounded w-full lg:w-1/4'>Confirmar Pedido</button>
        </div>
        
      </div>
      


    </Layout>

  )
}

export default TotalCliente