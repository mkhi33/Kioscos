import { useState, useEffect } from "react"
import Layout from "../../layout/Layout"
import useKioscosCliente from "../../hooks/useKioscosCliente"
import useKioscosRestaurante from "../../hooks/useKioscosRestaurante"
import Producto from "../../components/Producto"
import Modal from "../../components/ModalProducto"
const MenuUsuario = () => {

  const { categoriaActual, productos, qrDecodificado, setCategorias, setQrDecodificado } = useKioscosCliente();
  const { categorias, handleObtenerCategorias } = useKioscosRestaurante();

  useEffect( () => {
    if(localStorage.getItem('restauranteSeleccionado')){
      let data = JSON.parse(localStorage.getItem('restauranteSeleccionado'))
      setQrDecodificado(data)
    }
  }, [])

  useEffect( () => {
    if( Object.keys(qrDecodificado).length ) {
      // Obtener las categorias
      handleObtenerCategorias(qrDecodificado.restaurantId)
    }
  }, [qrDecodificado])

  useEffect( () => {
    if(categorias.length){
      setCategorias(categorias)
      console.log(categorias)
    }
  }, [categorias])
  return (
    <Layout>
      <h1 className='text-4xl font-black'>{categoriaActual.name}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación</p>
      <div className="flex  flex-col lg:flex-row gap-3">

        {productos?.map( producto => (
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