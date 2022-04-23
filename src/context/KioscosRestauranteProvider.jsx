import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
const KioscosRestauranteContext = createContext();

const KioscosRestauranteProvider = ( { children }) => {

    const [ mesas, setMesas ] = useState([])
    const [ modalCategoria, setModalCategoria ] = useState(false);
    const [ cargando, setCargando ] = useState(true)
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ productos, setProductos ] = useState([])
    const [ modalProductos, setModalProductos ] = useState(false)
    const [ cargandoCategoria, setCargandoCategoria ] = useState(false)
    const [ editandoCategoria , setEditandoCategoria ] = useState(false)
    const [ editandoProducto , setEditandoProducto ] = useState(false)
    const [ cargandoProductos, setCargandoProductos ] = useState(false)
    const [ productoSeleccionado, setProductoSeleccionado ] = useState({})


    useEffect( () => {
        if(Object.keys(categoriaActual).length){
            handleSetProductos(categoriaActual.id)
            console.log(categoriaActual)
        }
    }, [categoriaActual])
    
    const handleObtenerCategorias = (idRestaurante) => {
        setCargandoCategoria(true);
        if( !idRestaurante ) return;

        axios.get(`${import.meta.env.VITE_API_URL}/menu/categorias/restaurante/${idRestaurante}`).then( res => {
            setCategorias(res.data)
            setCargandoCategoria(false);
        }, err => {
            console.log(err)
            setCargandoCategoria(false);
        })
    }
    const handleClickCategoria = (id) => {
        
        const actual = categorias.filter( categoria => categoria.id === id )[0]
        setCategoriaActual(actual)
        handleSetProductos(id)
    }

    const handleEliminarCategoria = () => {
        setCargando(true)
        axios.delete(`${import.meta.env.VITE_API_URL}/menu/categorias/${categoriaActual.id}`).then( res => {
            toast.success("La categoría se elimino correctamente")
            setCargandoCategoria(false)
            handleObtenerCategorias(categoriaActual.idRestaurant)
        }, err => {
            toast.error("Error, categoría no eliminada")
            setCargandoCategoria(false)
        })
    }



    const handleSetProductos = (idCategoria) => {
        if(!idCategoria) return
        // Obtener los productos de la categoría actual
        axios.get(`${import.meta.env.VITE_API_URL}/menu/${idCategoria}/productos`).then( res => {
            setProductos(res.data)
        }, err => {
            console.log(err.toJSON())
            setProductos([])
        })
    }

    const handleClickProducto = ( idProducto ) => {
        const [productoActual] = productos.filter( producto => producto.id === idProducto )
        setProductoSeleccionado(productoActual)
    }

    const handleObtenerMesas = async (idRestaurante) => {
        if (!idRestaurante) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/mesas/${idRestaurante}`)
            setMesas(res.data)
        } catch (error) {
            setMesas([])
        }
        
    }
    
    return <KioscosRestauranteContext.Provider
        value={{
            mesas,
            handleObtenerMesas,
            modalCategoria,
            setModalCategoria,
            setCargando,
            cargando,
            handleObtenerCategorias,
            categorias, 
            setCategorias,
            setCategoriaActual,
            categoriaActual,
            handleSetProductos,
            productos,
            modalProductos,
            setModalProductos,
            handleEliminarCategoria,
            cargandoCategoria,
            setCargandoCategoria,
            editandoCategoria,
            setEditandoCategoria,
            handleClickCategoria,
            cargandoProductos,
            setCargandoProductos,
            handleClickProducto,
            productoSeleccionado,
            editandoProducto,
            setEditandoProducto
        }}
    >
        { children }
    </KioscosRestauranteContext.Provider>
}

export {
    KioscosRestauranteProvider
}

export default KioscosRestauranteContext;