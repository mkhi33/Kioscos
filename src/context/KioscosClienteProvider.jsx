import { useEffect, useState, createContext } from 'react';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  useKioscosRestaurante  from '../hooks/useKioscosRestaurante'
import axios from 'axios'

const KioscosClienteContext = createContext()

const KioscosClienteProvider = ({children}) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ productos, setProductos ] = useState([])
    const [ modal, setModal ] = useState(false);
    const [ pedido, setPedido ] = useState([])
    const [ total, setTotal ] = useState(0);

    const [ qrDecodificado, setQrDecodificado ] = useState({})
    const navigate = useNavigate();


    useEffect( () => {
        // Obtener Las categorías
        if(categorias.length){
            setCategoriaActual(categorias[0])
            handleSetProductos(categorias[0].id)
        }
    }, [categorias])

    useEffect( () => {
        if( Object.keys(qrDecodificado).length ){
            navigate("/cliente/menu")
        }
    }, [qrDecodificado])

    useEffect( () => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.price * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [ pedido ])


    useEffect( () => {
        if( Object.keys(categoriaActual) ){
            handleSetProductos(categoriaActual.id)
        }
    }, [ categoriaActual ])

    const handleSetProductos = (idCategoria) => {
        if(!idCategoria) return
        // Obtener los productos de la categoría actual
        axios.get(`${import.meta.env.VITE_API_URL}/menu/${idCategoria}/productos`).then( res => {
            setProductos(res.data)
        }, err => {
            console.log(err)
            setProductos([])
        })
    }

    const handleClickCategoria = (id) => {
        
        const actual = categorias.filter( categoria => categoria.id === id )[0]
        setCategoriaActual(actual)
        handleSetProductos(id)
    }


    const handleObtenerCategorias = (idRestaurante) => {
        if( !idRestaurante ) return;

        axios.get(`${import.meta.env.VITE_API_URL}/menu/categorias/restaurante/${idRestaurante}`).then( res => {
            setCategorias(res.data)
            console.log(categorias)
        }, err => {
            console.log(err)
        })
    }

    const handleSetProducto = producto => {

        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if( pedido.some( productoState => productoState.id === producto.id)){
            /// Actualizar la cantidad de este producto en el pedido
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState)
            console.log(pedidoActualizado)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        }else {
            // Se agrega el producto al pedido
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
        setModal(false)
       
    }


    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(true)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id )
        setPedido(pedidoActualizado)
        toast.success('Eliminado correctamente')
    }





    return (
        <KioscosClienteContext.Provider
            value= {{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                modal,
                setModal,
                productos,
                producto,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                total,
                qrDecodificado,
                setQrDecodificado,
                setCategorias,
                handleObtenerCategorias
            }}
        >
            {children}
        </KioscosClienteContext.Provider>
    )
}
export {
    KioscosClienteProvider
}

export default KioscosClienteContext  