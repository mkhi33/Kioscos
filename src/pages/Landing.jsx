import React from 'react'
import FooterLanding from '../components/FooterLanding'
import Header from '../components/Header'
import '../styles/Landing.Styles.css'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <>
        <Header />
        <div className='grid md:grid-cols-2 gap-2 '>

            <div className='container'>
                <h1 className='titulo-1 p-5'>Ordena comida en tus restaurantes favoritos</h1>
                <p className='texto-1 mt-10 p-5 '>Inicia sesión en nuestra plataforma y obten la mejor experiencia al realizar tus pedidos</p>
            
                <nav className='flex grid-cols-2 gap-4 mt-5 pl-16'>
                    
                    <Link className='bg-amber-500  text-white  hover:bg-amber-700 border rounded shadow text-center p-2' to='/signUp'>
                        <p>Registrate</p>    
                    </Link>
                    <Link className='bg-white  hover:bg-slate-300 border rounded shadow text-center font-bold p-2' to='/login'>
                        <p>Iniciar Sesión</p>    
                    </Link>


                </nav>
            </div>
            <div className='container'>
                
                <img height={360} width={360} src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832515/kioscos/assets/img-1_ux3u7n.svg' />    
            </div>

        </div>

        <div className='grid md:grid-cols-3  bg-amber-600  py-2 mt-12'>
            <h2 className='text-white text-3xl text-center'>No hagas filas</h2>
            <h2 className='text-white text-3xl text-center'>Gestiona tus pedidos</h2>
            <h2 className='text-white text-3xl text-center'>Monitorea el estado de tus pedidos</h2>
        </div>


        <div className='flex m-16'>
            <div className='md:w-7/12'>
                <img width={480} src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832519/kioscos/assets/restaurant-interior-1_wjp5oj.svg' />    
            </div>    
            <div className='md:w-5/12'>
                <h4 className='titulo-2'>Registra tu restaurante en la plataforma para ofrecer una mejor experiencia a tus clientes</h4>
                <p className='texto-1'>En Kioscos puedes gestionar los pedidos de tus clientes de la mejor manera.</p>
            
                <div className='flex grid-cols-2 gap-4 mt-5 pl-16'>

                    <Link className='bg-sky-500 text-white  hover:bg-sky-700 border rounded shadow text-center p-2' to='/signUp'>
                        <p>Registrate</p>    
                    </Link>
                    <Link className='bg-amber-500  hover:bg-amber-700 border rounded shadow text-center text-white p-2' to='/login'>
                        <p>Iniciar Sesión</p>    
                    </Link>


                </div>
            </div>  


        </div>

        <FooterLanding />
    </>
  )
}

export default Landing