import { useEffect, useState } from 'react'
import useKioscosCliente from '../hooks/useKioscosCliente';
import useKioscosRestaurante from '../hooks/useKioscosRestaurante';
import useKioscosAuth from '../hooks/useKioscosAuth'
import { useLocation, useNavigate } from 'react-router-dom';

const Categoria = ({categoria}) => {

    const { categoriaActual:categoriaActualCliente, handleClickCategoria:handleClickCategoriaCliente , setCategorias:setCategoriasCliente} = useKioscosCliente();
    const { categoriaActual:categoriaActualRestaurante, handleClickCategoria:handleClickCategoriaRestaurante , setCategorias:setCategoriasRestaurante } = useKioscosRestaurante();
    const { usuarioActual } = useKioscosAuth()
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const location = useLocation();
    const navigate = useNavigate()


    const { name, image, id } = categoria;

    useEffect( () => {

    }, [])

    useEffect( () => {
      if( usuarioActual?.rtn && categoria ){
        setCategoriaActual(categoriaActualRestaurante)
        

      }else if( usuarioActual?.lastName && categoria ){
        setCategoriaActual(categoriaActualCliente)

      }
    }, [categoriaActualRestaurante, categoriaActualCliente])

    const seleccionarCategoria = (id) => {
      if( usuarioActual?.rtn){
        handleClickCategoriaRestaurante(id)
        !location.pathname.split('/').includes('menu') ? navigate('/restaurante/menu') : null
      }else {
        handleClickCategoriaCliente(id)
        !location.pathname.split('/').includes('menu') ? navigate('/cliente/menu') : null
      }
    }


  return (
    <div onClick={ () => seleccionarCategoria(id)} className={` ${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-3 hover:bg-amber-400 cursor-pointer`}>
        <img 
            alt="Imagen image"
            style={{width:"70px", height:"70px"}}
            src={image}
        />
        <span
            type="button"
            className="text-2xl font-bold hover:cursor-pointer"
        >{name}</span>
    </div>

  )
}

export default Categoria