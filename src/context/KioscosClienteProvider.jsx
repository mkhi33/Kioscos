import { useEffect, useState, createContext } from 'react';
import {  toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const [ mesas, setMesas ] = useState([])
    const [ mesa, setMesa ] = useState({})
    const [ pedidoEnviado, setPedidoEnviado ] = useState(false)
    const [ pedidosDb, setPedidosDb ] = useState([])
    const [ modalPedidos, setModalPedidos ] = useState(false)

    const [ qrDecodificado, setQrDecodificado ] = useState({})
    const navigate = useNavigate();
    const location = useLocation()



    useEffect( () => {
        if( localStorage.getItem('pedido') ) {
            setPedido( Object.values(JSON.parse(localStorage.getItem('pedido'))))
        }
        if( localStorage.getItem('restauranteSeleccionado') ) {
            setQrDecodificado( Object.values(JSON.parse(localStorage.getItem('restauranteSeleccionado'))))
        }
    } , [])


    useEffect( () => {
        // Obtener Las categorías
        if(categorias.length){
            setCategoriaActual(categorias[0])
            handleSetProductos(categorias[0].id)
        }
    }, [categorias])

    useEffect( () => {
        if ( location.pathname === '/cliente' && Object.keys(qrDecodificado).length ){
            navigate("/cliente/menu")
            handleObtenerMesas(qrDecodificado.restaurantId)
        }
    }, [qrDecodificado])

    useEffect( () => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.price * producto.cantidad) + total, 0)
        handleObtenerMesas(qrDecodificado.restaurantId)
        setTotal(nuevoTotal)
        localStorage.setItem('pedido', JSON.stringify(pedido))
        
    }, [ pedido ])


    useEffect( () => {
        if( Object.keys(categoriaActual) ){
            handleSetProductos(categoriaActual.id)
            handleObtenerMesas(qrDecodificado.restaurantId)
        }
    }, [ categoriaActual ])



    const handleEnviarOrden = ( orden, usuarioActual ) => {
        let date = new Date().toISOString()

        //setPedidoEnviado(true)

        const ordenActual = {
            date,
            total,
            userId: usuarioActual.id,
            tableId: mesa.id,
            orderProducts: orden,
            start: date,
            end: date,
            state: 'no_procesado',
            restaurantId: qrDecodificado.restaurantId
        } 
        axios.post( `${import.meta.env.VITE_API_URL}/orden/${usuarioActual.id}`, ordenActual).then( res => {
            toast.success("Tu pedido se ha realizado correctamente")
            setPedidoEnviado(true)
            localStorage.removeItem('pedido')
            setPedido([])
            handleObtenerMisPedidos(usuarioActual.id)
            
        }, err => {
            console.log(err)
            toast.error("Ocurrio un error")
            setPedidoEnviado(false)
        })

    }

    const handleObtenerMesas = async (idRestaurante) => {
        if (!idRestaurante) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/mesas/${idRestaurante}`)
            setMesas(res.data)

            // Obtener la mesa actual
            let [actual] = mesas.filter( item => item.number === qrDecodificado.number )
            setMesa(actual)            
        } catch (error) {
            setMesas([])
        }
        
    }

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
        if( producto.cantidad === 0 ) return toast.info("La cantidad del pedido no es válida")
        if( pedido.some( productoState => productoState.id === producto.id)){
            /// Actualizar la cantidad de este producto en el pedido
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        }else {
            // Se agrega el producto al pedido
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
       
    }

    const handleObtenerMisPedidos = (ueserId) => {
        if( localStorage.getItem('restauranteSeleccionado') ) {
            setQrDecodificado(JSON.parse(localStorage.getItem('restauranteSeleccionado')))
        }
        axios.get(`${import.meta.env.VITE_API_URL}/orden/${ueserId}/${qrDecodificado.restaurantId}`).then( res => {
            setPedidosDb(res.data)
        }, err => {
            setPedidosDb([])
        })
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
                setCategoriaActual,
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
                handleObtenerCategorias,
                handleEnviarOrden,
                pedidoEnviado,
                setPedidoEnviado,
                handleObtenerMisPedidos,
                pedidosDb,
                modalPedidos,
                setModalPedidos
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