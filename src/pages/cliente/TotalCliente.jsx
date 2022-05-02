import { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import useKioscosCliente from '../../hooks/useKioscosCliente'
import { formatearDinero } from '../../helpers'
import useKioscoAuth from '../../hooks/useKioscosAuth'
import Cronometro from '../../components/Cronometro'
import TablaPedidosCliente from '../../components/TablaPedidosCliente'


const items = ['Pedido Actual', 'Mis Pedidos']

const TotalCliente = () => {
    const { total, pedido, handleEnviarOrden, pedidoEnviado, handleObtenerMisPedidos, pedidosDb} = useKioscosCliente();
    const { usuarioActual } = useKioscoAuth()
    const [ timeState, setTimeState ] = useState();
    const [ itemActual, setItemActual ] = useState(items[1])
    
    useEffect( () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
      setTimeState(time)
      
    }, [])

    useEffect( () => {
      if( pedido.length ){
        setItemActual(items[0])
      }else {
        setItemActual(items[1])

      }
    }, [pedido])

    useEffect( () => {
      if ( usuarioActual ) {
        handleObtenerMisPedidos(usuarioActual.id)
      }
    }, [usuarioActual])

    const handleEnviarPedido = () => {
        
      handleEnviarOrden(pedido, usuarioActual)
    }
  return (
    <Layout>
      
      <div className="w-full flex flex-col my-5 ">

        <div className="flex flex-row">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
                <button disabled={!pedido.length} onClick={ () => setItemActual(items[0])} className={`inline-block py-3 px-4 ${(pedido.length ? 'text-white' : 'text-gray-400 cursor-not-allowed dark:text-gray-500') } ${itemActual === items[0] ? 'bg-blue-600 rounded-lg active ' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white text-gray-400 rounded-lg'} `}  >Pedido Actual</button>
            </li>
            <li className="mr-2">
                <button onClick={ () => {
                  handleObtenerMisPedidos(usuarioActual.id) 
                  setItemActual(items[1])
                }}   className={`inline-block py-3 px-4 rounded-lg ${itemActual === items[1] ? 'bg-blue-600 rounded-lg active text-white' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white '}`  }>Mis Pedidos</button>
            </li>

        </ul>  
        
        </div>

        <div className='flex flex-col mt-5'>



          {itemActual === items[1]  ? (
            <div className='my-5'>
              <h1 className='text-4xl font-black'>{usuarioActual?.name}, Estos son tus pedidos vigentes</h1>
                <TablaPedidosCliente pedidos={pedidosDb} />
                
            </div>
          ) : (
            <div className='my-5'>
              <h1 className='text-4xl font-black'>Total y confirmar pedido</h1>
              <p className='text-2xl my-10'>{usuarioActual?.name}, confirma tu pedido</p>
              <div className="flex  flex-col  gap-3">
                <h1><span className='text-4xl font-bold'>Total a pagar:</span> <span className='text-amber-500 text-2xl text-bold'>{formatearDinero(total)}</span></h1>
                <button onClick={handleEnviarPedido} className='bg-indigo-500 text-white p-2 rounded w-full lg:w-1/4'>Confirmar Pedido</button>
              </div>
            </div>
          )}
        </div>

      </div>

      


    </Layout>

  )
}

export default TotalCliente