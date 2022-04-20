import KioscosAuthContext from '../context/KioscosAuthProvider'
import { useContext } from 'react'




const useKioscoAuth = () => {


    return useContext(KioscosAuthContext)     
    
} 

export default useKioscoAuth