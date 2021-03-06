import { useTimer } from 'react-timer-hook';
import {useEffect} from 'react'
import useKioscosRestaurante from '../hooks/useKioscosRestaurante';

const Cronometro = ({expiryTimestamp, size}) => {


    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () => handleOnExpire });



      const handleOnExpire = () => {
        console.warn('onExpire called')
      }

  return (
    <div style={{textAlign: 'center'}}>

      <div style={{fontSize: size}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Listo en:' : 'Sin iniciar'}</p>
      {
        /*

        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time)
        }}>Restart</button>
        */
      }
    </div>
  )
}

export default Cronometro