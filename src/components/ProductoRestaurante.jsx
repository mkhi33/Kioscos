import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatearDinero } from '../helpers'
import useKioscosRestaurante from '../hooks/useKioscosRestaurante'
import axios from 'axios'
import { toast } from 'react-toastify';
import Spinner from './Spinner'
import { useState } from 'react';
const ProductoRestaurante = ({ producto }) => {

    const { modalProductos, setModalProductos, handleClickProducto, setEditandoProducto, handleClickCategoria, setCargandoProductos } = useKioscosRestaurante()
    const [ cargando, setCargando ] = useState(false);
    const handleEditarProducto = () => {

        handleClickProducto(producto.id)
        setEditandoProducto(true)
        setModalProductos(true)
    }

    const handleEliminarProducto = () => {
        setCargando(true)
        axios.delete(`${import.meta.env.VITE_API_URL}/menu/${producto.categorieId}/${producto.id}`).then( res => {
            handleClickCategoria(producto.categorieId)
            toast.success('Producto Eliminado Correctamente')
            setCargandoProductos(false)
        }, err => {
            toast.error('No se pudo eliminar el producto')
            setCargandoProductos(false)
            
        })

    }
    const sx = {
        maxWidth: 500,
        minWidth: cargando ? 200 : null
    }

  return (

    <Card sx={sx}>
        { cargando ? <Spinner /> : (

            <>
                <CardMedia
                    component="img"
                    alt={producto?.name}
                    height="140"
                    image={producto?.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <span className='font-bold text-3xl'>
                            {producto?.name}
                        </span>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        <span className="text-amber-500 font-bold">
                            {formatearDinero(producto?.price)}
                        </span>
                    </Typography>

                </CardContent>

                <CardActions className='flex'>
                    <button onClick={handleEditarProducto} className='p-1  bg-amber-500 hover:bg-amber-600 text-white rounded w-full' >Editar</button>
                    <button onClick={handleEliminarProducto} className='p-1 bg-red-500 hover:bg-red-600 text-white rounded w-full' >Eliminar</button>
                </CardActions>
            
            </> 
        )}
    </Card>
        
  )
}

export default ProductoRestaurante