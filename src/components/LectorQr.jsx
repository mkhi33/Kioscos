import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
const LectorQr = () => {

    const [data, setData] = useState('No result');
    const [escaneando, setEscaneando] = useState(false);



    return (
        <div className='flex flex-row'>
            <div className='container mx-auto bg-indigo-600 border rounded-3xl '>
                <p className='text-white w-full text-center mt-4 mb-4'>Para continuar escannea el código QR que se encuentra en tu mesa.</p>   

                {
                    escaneando ? (
                        <div className='bg-white w-full md:w-full lg:w-1/4  ml-auto mr-auto h-auto mb-16 border rounded-2xl p-2'>
                            <QrReader
                                className='border rounded-2xl'
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
                                <img className='ml-auto mr-auto' src='../../assets/img-3.svg' />    
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
  return (
    <>



      <QrReader
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
    </>
  )
}

export default LectorQr