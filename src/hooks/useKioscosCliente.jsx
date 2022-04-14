import { useContext } from "react"
import KioscosClienteContext from "../context/KioscosClienteProvider";

const useKioscosCliente = () => {
    return useContext(KioscosClienteContext);
}

export default useKioscosCliente;
