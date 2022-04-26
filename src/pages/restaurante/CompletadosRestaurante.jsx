import {useState, useEffect} from 'react'
import Layout from '../../layout/Layout'
import TablaPedidosCompletados from '../../components/TablaPedidosCompletados'
import useKioscosRestaurante from '../../hooks/useKioscosRestaurante'
import useKioscoAuth from '../../hooks/useKioscosAuth'
const CompletadosRestaurante = () => {

  const { handleObtenerPedidos, pedidos } = useKioscosRestaurante()
  const { usuarioActual } = useKioscoAuth();

  useEffect( () => {
    if( usuarioActual ) {
      handleObtenerPedidos(usuarioActual.id)
    }
  }, [usuarioActual])


  return (
    <Layout>
        <div className="w-full">
          <TablaPedidosCompletados pedidos={pedidos} />
        </div>
    </Layout>
  )
}

export default CompletadosRestaurante