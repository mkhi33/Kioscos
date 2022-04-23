import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { toast } from 'react-toastify';
import Spinner from './Spinner'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import useKioscosRestaurante from '../hooks/useKioscosRestaurante';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width:"40rem"
  };

const ModalProductoRestaurante = ({ categoriaId }) => {

    const { cargandoProductos, setCargandoProductos, setModalProductos, modalProductos, handleSetProductos, editandoProducto, productoSeleccionado, setEditandoProducto } = useKioscosRestaurante()
    const [ cargando, setCargando ] = useState(false)
    const [ producto, setProducto ] = useState({
        name:"",
        image:"",
        price:""
    })

    useEffect( () => {
        if( editandoProducto && productoSeleccionado ) {
            setProducto({ 
                name: productoSeleccionado.name,
                image: productoSeleccionado.image,
                price: productoSeleccionado.price
            })
        }
    }, [editandoProducto, productoSeleccionado])

    const handleOnchange = ( e ) => {
        setProducto({...producto, [e.target.name]: e.target.value})
    }
    const getBase64 = async (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        setProducto({...producto, image: reader.result})

        };
        reader.onerror = function (error) {
            setProducto({...producto, image: null})
        };
     }

     const nuevoProducto = () => {

        if( Object.values(producto).includes("")) return toast.error("Todos los campos son obligatorios")
        setCargando(true)
        
        axios.post(`${import.meta.env.VITE_API_URL}/menu/${categoriaId}/productos`, producto).then( res => {
           setCargando(false)
           toast.success("El producto se agrego correctamente")
           setProducto({
               name:"",
               image:"",
               price:""
           })
           setModalProductos(false)
           handleSetProductos(categoriaId)
       }, err => {
           toast.error("Error, el producto no fue agregado")
           setCargando(false)

        })

     }
     const editarProducto = () => {

        if( Object.values(producto).includes("")) return toast.error("Todos los campos son obligatorios")
        setCargando(true)

        axios.put(`${import.meta.env.VITE_API_URL}/menu/${categoriaId}/${productoSeleccionado.id}`, producto).then( res => {
           setCargando(false)
           toast.success("El producto se actualizo correctamente")
           setProducto({
               name:"",
               image:"",
               price:""
           })
           setModalProductos(false)
           handleSetProductos(categoriaId)
           setEditandoProducto(false)
       }, err => {
           toast.error("Error, el producto no fue actualizado")
           setCargando(false)

        })

     }


     const handleSubmit = (e) => {
         e.preventDefault()

         if( editandoProducto ) {
            editarProducto()
         }else {
             nuevoProducto()
         }
         
     }

     const reset = () => {
        setProducto({...producto, image: null})
    }

  return (
    <div>
            <Modal
                open={modalProductos}
                onClose={ () => setModalProductos(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            {cargando ? (<div className="ml-auto mr-auto"><Spinner  /></div>) : 
               (

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    sx={style}
                    className="flex flex-col gap-4"
                >
                    <CloseIcon className="ml-auto cursor-pointer " onClick={() => setModalProductos(false)} />
                    <Typography className="text-center" id="modal-modal-title" variant="h6" component="h2">
                        { editandoProducto ? 'Editar Producto': 'Nuevo Producto' }
                    </Typography>

                    {producto.image ? (
                        <div  className="flex justify-center">
                            <div>
                                <img style={{width:"132px", height:"132px"}} src={producto.image} />
                                <button onClick={reset} className='bg-red-600 hover:bg-red-500 p-2 text-white mt-2 rounded mb-4'>Eliminar Imagen</button>
                            </div>
                            
                        </div>
                        ): 
                        (
                            <div className="flex flex-row justify-center">
                                <AddPhotoAlternateIcon  style={{fontSize:"132px"}}/>

                            </div>
                        )
                    }

                    <input className='mt-5' type="file" onChange={  (e) =>  getBase64(e.target.files[0])} />

                    <TextField
                        label="Nombre Producto"
                        id="filled-hidden-label-small"
                        variant="filled"
                        size="small"
                        type="text"
                        placeholder='Ejem: Pizzas'
                        className="w-full"
                        name="name"
                        value={producto.name}
                        onChange= { handleOnchange }
                    
                    />
                    <TextField
                        label="Precio del producto"
                        id="filled-hidden-label-small"
                        variant="filled"
                        size="small"
                        type="number"
                        placeholder='Ejem: 255.25'
                        className="w-full"
                        name="price"
                        value={producto.price}
                        onChange= { handleOnchange }
                    />

                    <button type="submit" className="bg-indigo-700 hover:bg-indigo-600 p-2 text-white rounded w-full mt-4 ">{editandoProducto ? 'Actualizar Producto' : 'Guardar Producto'}</button>
                    
                        
                </Box>
               )
            } 
        </Modal>
    </div>
  )
}

export default ModalProductoRestaurante