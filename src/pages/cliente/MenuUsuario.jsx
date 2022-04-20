import { useState } from "react"
import Layout from "../../layout/Layout"
import useKioscosCliente from "../../hooks/useKioscosCliente"
import Producto from "../../components/Producto"
import Modal from "../../components/ModalProducto"
const MenuUsuario = () => {

  const { categoriaActual, productos } = useKioscosCliente();
  return (
    <Layout>
      <h1 className='text-4xl font-black'>{categoriaActual.name}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu contenido a continuación</p>
      <div className="flex  flex-col lg:flex-row gap-3">

        {productos.map( producto => (
          <div key={producto.id} className="w-full lg:w-1/4 ">
            <Producto 
              
              producto={producto}  
  
            />
          </div>
        ))}
      </div>
      
      <Modal />

    </Layout>
  )
}

export default MenuUsuario