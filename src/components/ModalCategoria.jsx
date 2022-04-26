import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Spinner from './Spinner'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import useKioscosRestaurante from '../hooks/useKioscosRestaurante'

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

const ModalCategoria = ({ restaurantId}) => {


    const { 
        setModalCategoria,
        modalCategoria,
        cargando,
        setCargando,
        handleObtenerCategorias,
        setCargandoCategoria,
        editandoCategoria,
        setEditandoCategoria,
        categoriaActual,
      } = useKioscosRestaurante();
    
    const [ guardando, setGuardando ] = useState(false)
    const [ categoria, setCategoria ] = useState({
        idRestaurant: '',
        name: '',
        image: ''
    })

    useEffect( () => {
        if(restaurantId){
            setCategoria({...categoria, idRestaurant: restaurantId})
        }
    }, [restaurantId])

    useEffect( () => {
        if(editandoCategoria) {
            setCategoria(categoriaActual)
        }
    }, [editandoCategoria])


    
    const getBase64 = async (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        setCategoria({...categoria, image: reader.result})

        };
        reader.onerror = function (error) {
            setCategoria({...categoria, image: null})
        };
     }
       
    const handleClose = () => {
        setModalCategoria(false);
        setEditandoCategoria(false)
    }

    const onChangeCategoria = (e) => {
        setCategoria({...categoria, [e.target.name]: e.target.value})
    }
    const reset = () => {
        setCategoria({...categoria, image: null})
    }

    const handleSubmit = e => {
    
        e.preventDefault()
        console.log(categoria)
        if( Object.values(categoria).includes("") ){
            toast.error("Todos los campos son obligatorios")
            return;
        }

        setGuardando(true)
        setCargandoCategoria(true)

        if( editandoCategoria ) {

            let data = {
                name: categoria.name,
                image: categoria.image
            }

            axios.put(`${import.meta.env.VITE_API_URL}/menu/categorias/${categoria.id}`, data ).then( res => {
                toast.success("Categoría actualizada correctamente")
                handleObtenerCategorias(categoria.idRestaurant)
                setGuardando(false)
                setCargandoCategoria(false)
                setModalCategoria(false)
                setCategoria({
                    ...categoria,
                    name: '',
                    image: ''
                })
            }, err => {
                console.log(err)
                toast.error("Error al actualizar la categoría")
                setCargandoCategoria(false)
                setGuardando(false)
            })

        }else {

            axios.post(`${import.meta.env.VITE_API_URL}/menu/categorias`, categoria).then( res => {
                toast.success("Categoría guardada correctamente")
                handleObtenerCategorias(categoria.idRestaurant)
                setGuardando(false)
                setCargandoCategoria(false)
                setModalCategoria(false)
                setCategoria({
                    ...categoria,
                    name: '',
                    image: ''
                })
            }, err => {
                console.log(err)
                toast.error("Error al guardar la categoría")
                setCargandoCategoria(false)
                setGuardando(false)
            })
        }

    }
    
    return (
    <div>
        <Modal
            open={modalCategoria}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <div className='flex flex-col'>
                    <CloseIcon className="ml-auto cursor-pointer" onClick={handleClose} />
                    <div className='flex gap-4'>
                    { guardando ? (<div className="ml-auto mr-auto"><Spinner  /></div>) :(

                        <div className="w-full">
                            
                            <Typography className="flex flex-row justify-center p-4" variant="h6" component="h2">
                                { editandoCategoria ? 'Editar Categoría' : 'Nueva Categoria'}
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                
                                >
                                {categoria.image ? (
                                    <div  className="flex justify-center">
                                        <div>
                                            <img style={{width:"132px", height:"132px"}} src={categoria.image} />
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
              
                                <TextField
                                    label="Nombre Categoria"
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    type="text"
                                    placeholder='Ejem: Pizzas'
                                    className="w-full"
                                    value={categoria.name}
                                    name="name"
                                    
                                    onChange= { onChangeCategoria }
                                />

                                <input className='mt-5' type="file" onChange={  (e) =>  getBase64(e.target.files[0])} />
                                

                                <button type="submit" className="bg-indigo-700 hover:bg-indigo-600 p-2 text-white rounded w-full mt-4 ">{ editandoCategoria ? 'Editar categoría' : 'Guardar Categoría'}</button>
                                    
                            </Box>

                        </div>
                    )}

                    </div>
                </div>

                


            </Box>  

        </Modal>
    </div>
  )
}

export default ModalCategoria