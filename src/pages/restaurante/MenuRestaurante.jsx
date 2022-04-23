import {useState, useEffect} from 'react'
import Layout from '../../layout/Layout'
import useKioscosRestaurante from '../../hooks/useKioscosRestaurante'
import useKioscosAuth from '../../hooks/useKioscosAuth'
import useKioscosCliente from '../../hooks/useKioscosCliente'
import ModalCategoria from '../../components/ModalCategoria'
import ProductoRestaurante from '../../components/ProductoRestaurante'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ModalProductoRestaurante from '../../components/ModalProductoRestaurante'
import Spinner from '../../components/Spinner'

const MenuRestaurante = () => {


    const { 
        setModalCategoria,
        setCategorias,
        categorias,
        modalCategoria,
        cargando,
        setCargando,
        productos,
        setModalProductos,
        modalProductos,
        handleObtenerCategorias,
        handleEliminarCategoria,
        cargandoCategoria, 
        setCargandoCategoria,
        categoriaActual,
        setCategoriaActual,
        setEditandoCategoria
      } = useKioscosRestaurante();

    const { usuarioActual } = useKioscosAuth()


    const eliminarCategoria = () => {
      handleEliminarCategoria()
      setCargandoCategoria(true)
      
    }

    const modalEditar = () => {
      setEditandoCategoria(true)
      setModalCategoria(true)
    }

  return (
    <Layout>
          {cargandoCategoria ? <Spinner /> : (
            <div className='w-full flex-col'>
              <div className=" flex flex-row justify-end gap-4" >
                <button onClick={ modalEditar  } className='p-2 bg-amber-500 hover:bg-amber-600 text-white rounded' >Editar Categoría</button>
                <button onClick={ eliminarCategoria } className='p-2 bg-red-500 hover:bg-red-600 text-white rounded' >Eliminar Categoría</button>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex flex-col">
                  <h1 className='text-4xl font-black'>{categoriaActual?.name}</h1>
                  <p className='text-2xl my-10'>{ productos?.length ? 'Gestiona tus productos' : 'Agrega Productos'}</p>
                </div>
              </div>

              <div className='flex flex-row'>
                <div className="grid grid-cols-1 ml-auto mr-auto lg:grid-cols-4 gap-4">
                  { productos.map( producto => (
                    <ProductoRestaurante key={producto?.id} producto={producto} />
                  ) )}

                </div>
              </div>

              <Box className='mt-5 flex flex-row justify-center' sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab className="ml-auto mr-auto" onClick={ () => setModalProductos(true) } color="primary" aria-label="add">
                    <AddCircleIcon style={{fontSize:"50px"}} />
                </Fab>
              </Box>
              
            </div>

          )}

        <ModalProductoRestaurante 
            categoriaId={categoriaActual?.id}
          />
                
        <ModalCategoria 
            restaurantId={usuarioActual?.id}
        />

    </Layout>
  )
}

export default MenuRestaurante