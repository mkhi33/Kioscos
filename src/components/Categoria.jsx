import React from 'react'
import useKioscosCliente from '../hooks/useKioscosCliente';
const Categoria = ({categoria}) => {

    const { categoriaActual, handleClickCategoria } = useKioscosCliente();
    const { name, image, id } = categoria;

  return (
    <div className={` ${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-3 hover:bg-amber-400`}>
        <img 
            alt="Imagen image"
            style={{width:"70px", height:"70px"}}
            src={`../../assets/img/${image}`}
        />
        <button
            type="button"
            className="text-2xl font-bold hover:cursor-pointer"
            onClick={ () => handleClickCategoria(id)}
        >{name}</button>
    </div>

  )
}

export default Categoria