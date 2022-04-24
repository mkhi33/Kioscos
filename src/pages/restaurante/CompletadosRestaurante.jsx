import React from 'react'
import Layout from '../../layout/Layout'
import TablaPedidosCompletados from '../../components/TablaPedidosCompletados'
const CompletadosRestaurante = () => {
  return (
    <Layout>
        <div class="w-full">
          <TablaPedidosCompletados />
        </div>
    </Layout>
  )
}

export default CompletadosRestaurante