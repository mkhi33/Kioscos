import { useEffect , useState} from 'react'
import Categoria from '../components/Categoria';
import useKioscosCliente from '../hooks/useKioscosCliente';
import useKioscosRestaurante from '../hooks/useKioscosRestaurante';
import useKioscosAuth from '../hooks/useKioscosAuth'





const Sidebar = ({ restaurantId }) => {


    const { categorias: categoriasRestaurante , handleObtenerCategorias: obtenerCategoriasRestaurante  } = useKioscosRestaurante();
    const { categorias: categoriasCliente,  handleObtenerCategorias: handleObtenerCategoriasCliente } = useKioscosCliente()
    const { usuarioActual } = useKioscosAuth()
    const [ categorias, setCategorias ] = useState([]);

    
    useEffect( () => {
        if(restaurantId !== -1 && usuarioActual?.rtn ){
            obtenerCategoriasRestaurante(restaurantId)
        }else if( restaurantId !== -1 && usuarioActual?.lastName ){
            handleObtenerCategoriasCliente(restaurantId)
        }
    }, [restaurantId, usuarioActual])

    useEffect( () => {
        if( categoriasRestaurante.length ){
            setCategorias(categoriasRestaurante)

        }
    }, [categoriasRestaurante])

    useEffect( () => {
        if( categoriasCliente.length ){
            setCategorias(categoriasCliente)

        }
    }, [categoriasCliente])





  return (
    <>

        <nav className={`mt-5 ${location.pathname.split('/').includes('menu') ? 'block': 'hidden' } lg:block`}>
            {categorias.map( categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria={categoria}
                />
            ))}
        </nav>  
    </>
  )
}

export default Sidebar