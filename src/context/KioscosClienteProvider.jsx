import { useEffect, useState, createContext } from 'react';
import { categorias as cat } from '../test/test';
import { productos as prods } from '../test/test';
import {  toast } from 'react-toastify';

const KioscosClienteContext = createContext()

const KioscosClienteProvider = ({children}) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ productos, setProductos ] = useState([])
    const [ modal, setModal ] = useState(false);
    const [ pedido, setPedido ] = useState([])
    const [ total, setTotal ] = useState(0);


    useEffect( () => {
        // Obtener Las categorías

        setCategorias(cat)
        setCategoriaActual(cat[0])
        handleSetProductos(cat[0].id)
    }, [])



    useEffect( () => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.price * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [ pedido ])



    const handleSetProductos = (idCategoria) => {
        const productos = prods.filter( item => item.categorieId == idCategoria)
        setProductos(productos)
    }

    const handleClickCategoria = (id) => {
        const actual = categorias.filter( categoria => categoria.id == id )[0]
        setCategoriaActual(actual)
        handleSetProductos(id)
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
                total
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