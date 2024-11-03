import React from 'react'
import style from '../Footer/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook ,faInstagram ,faTwitter} from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Footer() {

  const navigate = useNavigate();
  const toRegister = () => {
    navigate('/Register');
  }

  return (
    <div className={style.container}>
      <div className={style.part1}>

         <ul className={style.lists}>
          <li>SHOP</li>
          <li>gifts</li>
          <li>games</li>
          <li>mobiles</li>
          <li>home & kitchen</li>
         </ul>

         <ul className={style.lists}>
          <li>HELP</li>
          <li>Countact us</li>
          <li>Tshop111@gmail.com</li>
         </ul>

      </div>

      <div className={style.part2}>
          <div className={style.subscribe}>
            <p>Sign Up to get 20% off your first order !!</p>
            <button onClick={toRegister} >Subscribe</button>
          </div>
          <div className={style.icons}>
          <FontAwesomeIcon icon={faFacebook} size='2x' color="#fff" />
          <FontAwesomeIcon icon={faInstagram} size='2x' color="#fff"/>
          <FontAwesomeIcon icon={faTwitter} size='2x' color="#fff"/>
           </div>
     </div>

    </div>
  )
}
