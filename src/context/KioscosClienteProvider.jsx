import { useEffect, useState, createContext } from 'react';
import { categorias as cat } from '../test/test';
import { productos as prods } from '../test/test';
const KioscosClienteContext = createContext()

const KioscosClienteProvider = ({children}) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ productos, setProductos ] = useState([])
    const [ modal, setModal ] = useState(false);





    useEffect( () => {
        // Obtener Las categorías

        setCategorias(cat)
        setCategoriaActual(cat[1])
        


    }, [])

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


    return (
        <KioscosClienteContext.Provider
            value= {{
                categorias,
                categoriaActual,

                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                productos
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