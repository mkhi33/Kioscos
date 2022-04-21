import { useContext } from "react"
import KioscosRestauranteContext from "../context/KioscosRestauranteProvider";

const useKioscosRestaurante = () => {
    return useContext(KioscosRestauranteContext);
}

export default useKioscosRestaurante;
