import { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import useKioscosCliente from '../../hooks/useKioscosCliente'
import { formatearDinero } from '../../helpers'
import useKioscoAuth from '../../hooks/useKioscosAuth'
import Cronometro from '../../components/Cronometro'

const TotalCliente = () => {
    const { total, pedido, handleEnviarOrden, pedidoEnviado } = useKioscosCliente();
    const { usuarioActual } = useKioscoAuth()
    const [ timeState, setTimeState ] = useState();

    useEffect( () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
        setTimeState(time)

    }, [])

    const handleEnviarPedido = () => {
        
      handleEnviarOrden(pedido, usuarioActual)
    }
  return (
    <Layout>
      <div className="w-full">
        {pedidoEnviado ? (
          <div>
            <h1 className='text-4xl font-black'>Tu pedido se esta procesando</h1>
              <p className='text-2xl my-10'>{usuarioActual?.name}, tu pedido estara listo en:</p>
              <Cronometro expiryTimestamp={timeState} />
              
          </div>
        ) : (
          <div>
            <h1 className='text-4xl font-black'>Total y confirmar pedido</h1>
            <p className='text-2xl my-10'>{usuarioActual?.name}, confirma tu pedido</p>
            <div className="flex  flex-col  gap-3">
              <h1><span className='text-4xl font-bold'>Total a pagar:</span> <span className='text-amber-500 text-2xl text-bold'>{formatearDinero(total)}</span></h1>
              <button onClick={handleEnviarPedido} className='bg-indigo-500 text-white p-2 rounded w-full lg:w-1/4'>Confirmar Pedido</button>
            </div>
          </div>
        )}
        
      </div>
      


    </Layout>

  )
}

export default TotalCliente