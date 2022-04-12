import React from 'react'

const Sidebar = () => {

    const categorias = [];
  return (
    <>
        <img src={``} width={300} height={100} alt="Imagen logotipo" />

        <nav className="mt-10">
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