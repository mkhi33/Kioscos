import React from 'react'
import Categoria from '../components/Categoria';
import useKioscosCliente from '../hooks/useKioscosCliente';




const Sidebar = () => {

    const { categorias } = useKioscosCliente();
    console.log(categorias)

  return (
    <>

        <nav className="mt-5">
            {categorias.map( categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria={categoria}
                />
            ))}
        </nav>
    </>
  )
}

export default Sidebar