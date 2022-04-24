import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import useKioscosCliente from '../hooks/useKioscosCliente'
const LectorQr = () => {

    const [data, setData] = useState(null);
    const [escaneando, setEscaneando] = useState(false);
    const [facignMode, setFacignMode ] = useState(true);
    const [constraints, setConstrains ] = useState({
        facingMode: {
            exact: 'environment'
        }
    });

    const { qrDecodificado, setQrDecodificado } = useKioscosCliente();

    useEffect( () => {
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            setFacignMode(true)
        }else setFacignMode(false)
        
    }, [])

    useEffect( () => {
        if( data ) {
            let objeto = JSON.parse(data)
            localStorage.setItem('restauranteSeleccionado', data)
            setQrDecodificado(objeto)
        }
    }, [ data ])





    return (
        <div className='flex flex-row'>
            <div className='container mx-auto bg-indigo-600 border rounded-3xl '>
                <p className='text-white w-full text-center mt-4 mb-4'>Para continuar escannea el código QR que se encuentra en tu mesa.</p>   

                {
                    escaneando ? (
                        <div className='bg-white w-full md:w-full lg:w-1/4  ml-auto mr-auto h-auto mb-16 border rounded-2xl p-2'>
                            <QrReader
                                className='border rounded-2xl'
                                delay={300}
                                constraints={ facignMode? constraints : null}
     
                                onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.text);
                                }

                                if (!!error) {
                                    console.info(error);
                                }
                                }}
                                style={{ width: '100%' }}
                            />
                            <p>{data}</p>
                            <div className='flex flex-row justify-center'>
                                <button onClick={ () => setEscaneando(false)} className='p-3 bg-amber-600 border rounded ml-auto mr-auto text-white mb-2'>Cancelar</button>
                            </div>
                        </div>
                    ): (
                        <div>

                            <div className='bg-white w-full md:w-full lg:w-1/4  ml-auto mr-auto h-auto mb-16 border rounded-2xl '>
                                <img className='ml-auto mr-auto' src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832499/kioscos/assets/img-3_udbq5f.svg' />    
                            </div>

                            <div className='flex flex-row justify-center'>
                                <button onClick={() => setEscaneando(true)} className='p-3 bg-amber-600 border rounded ml-auto mr-auto text-white mb-2'>Escannear Código QR</button>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default LectorQr