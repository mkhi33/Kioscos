import { useEffect, useState } from 'react'
import useKioscosCliente from '../hooks/useKioscosCliente';
import useKioscosRestaurante from '../hooks/useKioscosRestaurante';
import useKioscosAuth from '../hooks/useKioscosAuth'
const Categoria = ({categoria}) => {

    const { categoriaActual:categoriaActualCliente, handleClickCategoria:handleClickCategoriaCliente , setCategorias:setCategoriasCliente} = useKioscosCliente();
    const { categoriaActual:categoriaActualRestaurante, handleClickCategoria:handleClickCategoriaRestaurante , setCategorias:setCategoriasRestaurante } = useKioscosRestaurante();
    const { usuarioActual } = useKioscosAuth()
    const [ categoriaActual, setCategoriaActual ] = useState({});

    const { name, image, id } = categoria;


    useEffect( () => {
      console.log("inicio")
      if( usuarioActual?.rtn && categoria ){
        setCategoriaActual(categoriaActualRestaurante)
      }else if( usuarioActual?.lastName && categoria ){
        setCategoriaActual(categoriaActualCliente)
      }
    }, [categoriaActualRestaurante, categoriaActualCliente])

    const seleccionarCategoria = (id) => {
      if( usuarioActual?.rtn){
        handleClickCategoriaRestaurante(id)
      }else {
        handleClickCategoriaCliente(id)
      }
    }


  return (
    <div className={` ${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-3 hover:bg-amber-400`}>
        <img 
            alt="Imagen image"
            style={{width:"70px", height:"70px"}}
            src={image}
        />
        <button
            type="button"
            className="text-2xl font-bold hover:cursor-pointer"
            onClick={ () => seleccionarCategoria(id)}
        >{name}</button>
    </div>

  )
}

export default Categoria