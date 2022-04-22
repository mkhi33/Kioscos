import {useState, useEffect} from 'react'
import Layout from '../../layout/Layout'
import useKioscosRestaurante from '../../hooks/useKioscosRestaurante'
import useKioscosAuth from '../../hooks/useKioscosAuth'
import ModalCategoria from '../../components/ModalCategoria'
const MenuRestaurante = () => {
    const { setModalCategoria, modalCategoria, setCargandoCategorias} = useKioscosRestaurante();
    const { usuarioActual } = useKioscosAuth()

    useEffect( () => {
        
    }, [modalCategoria])

  return (
    <Layout>
        <ModalCategoria 
            setModalCategoria={setModalCategoria} 
            modalCategoria={modalCategoria}
            restaurantId={usuarioActual?.id}
            setCargandoCategorias={setCargandoCategorias}
        />
    </Layout>
  )
}

export default MenuRestaurante