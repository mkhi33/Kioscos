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
      <div className="flex  flex-col gap-3">
          {cargandoCategoria ? <Spinner /> : (
            <div className='flex flex-row gap-4 justify-end'>
              <button onClick={ modalEditar  } className='p-2 bg-amber-500 hover:bg-amber-600 text-white rounded' >Editar Categoría</button>
              <button onClick={ eliminarCategoria } className='p-2 bg-red-500 hover:bg-red-600 text-white rounded' >Eliminar Categoría</button>
            </div>

          )}
        <h1 className='text-4xl font-black'>{categoriaActual?.name}</h1>
        <p className='text-2xl my-10'>Gestiona tus productos</p>
        <div className="grid grid-cols-1 ml-auto mr-auto lg:grid-cols-4 gap-4">
          { productos.map( producto => (
            <ProductoRestaurante key={producto?.id} producto={producto} />
          ) )}

        </div>
        { usuarioActual?.rtn  && (<Box className='mt-5 flex flex-row justify-center' sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab onClick={ () => setModalProductos(true) } color="primary" aria-label="add">
                <AddCircleIcon style={{fontSize:"50px"}} />
            </Fab>
          </Box>)
        }
      </div>

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