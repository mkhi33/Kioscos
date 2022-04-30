import { createContext, useState, useEffect } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


const KioscosAuthContext = createContext();

const KioscosAuthProvider = ({children}) => {

    const [ token, setToken ] = useState(null)
    const [ decodificado, setDecodificado ] = useState({})
    
    const [ usuarioActual, setUsuarioActual ] = useState();
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect( () => {

        // Verificar si hay un token en localStorage
        if( localStorage.getItem('KioscosToken') ) {
            setToken(localStorage.getItem('KioscosToken'))
            let tknDecode = decodeToken(token)
            let expiro = isExpired(token)   
            setDecodificado(tknDecode)
            handleObtenerUsuario(tknDecode, expiro)
            return
            
        } else {
            handleValidarAcceso()
        }

        
        

    }, [])

    useEffect( () => {

        if(usuarioActual){
            handleValidarAcceso()
        }
    }, [usuarioActual])

    useEffect(  () => {
        if( token ){
            let tknDecode = decodeToken(token)
            let expiro = isExpired(token)            
            handleObtenerUsuario(tknDecode, expiro)
            localStorage.setItem('KioscosToken', token)
        }
    }, [ token ])

    const handleValidarAcceso = () => {
        
        if( (location.pathname.split('/').includes('cliente') || location.pathname.split('/').includes('restaurante'))  && !usuarioActual ){
            // Asegurarse de que tenga acceso unicamente a las rutas permitidas (Usuario no autenticado)
            navigate('/login')
            return
        }

        if( usuarioActual?.rtn && location.pathname.split('/').includes('cliente') ){
            // Asegurarse de que tenga acceso unicamente a las rutas permitidas para el usuario restaurante
            navigate('/login')
            return
        }
        if( usuarioActual?.lastName && location.pathname.split('/').includes('restaurante') ){
            // Asegurarse de que tenga acceso unicamente a las rutas permitidas para el usuario cliente
            navigate('/login')
            return
        }
    }
    
    const handleObtenerUsuario =  (tkn, expiro) => {

        if( !tkn ) return;
        const tipo = tkn.tipo === 'cliente' ? 'usuarios' : 'restaurantes';
        const url = `${import.meta.env.VITE_API_URL}/${tipo}/${tkn.id}`
        axios.get(url,{email: tkn.id}).then( (res) => {
            
            if( tkn && !expiro ) {
                setUsuarioActual(res.data)
                
            }else {
                setUsuarioActual(null)
            }
        }, (err) => {
            setUsuarioActual(null)
        })
    }

    

    
    return (
        <KioscosAuthContext.Provider
            value={{
                setToken,
                usuarioActual,
            }}
        >
            {children}
        </KioscosAuthContext.Provider>
    )
}

export {
    KioscosAuthProvider
}

export default KioscosAuthContext