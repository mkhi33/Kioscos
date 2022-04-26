import {useEffect, useState} from 'react'
import TablaPedidos from '../../components/TablaPedidos'
import Layout from '../../layout/Layout'
import useKioscosRestaurante from '../../hooks/useKioscosRestaurante'
import useKioscoAuth from '../../hooks/useKioscosAuth'
const PedidoRestaurante = () => {

  const { handleObtenerPedidos, pedidos } = useKioscosRestaurante()
  const { usuarioActual } = useKioscoAuth();
  
  useEffect( () => {
    if( usuarioActual ) {
      handleObtenerPedidos(usuarioActual.id)
    }
  }, [usuarioActual])


  return (
    <Layout>
      <div className='w-full'>
        <TablaPedidos  pedidos={pedidos}/>
      </div>
    </Layout>
  )
}

export default PedidoRestaurante