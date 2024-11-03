import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../Navbar/Navbar.module.css';
import { faShopify } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {

  const { isLogin, setIsLogin, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLogin(false);
    setUserData({});
    navigate('/Login');
  }


  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid d-flex justify-content-evenly">
        <div className={style.brand}>
          <FontAwesomeIcon icon={faShopify} size="2x" color="#2c5b43" />
          <Link className="navbar-brand" to="/">T-Shop</Link>
        </div>

        <div className={`navbar-nav ${style.Links}`}>

            {isLogin ?
              <div className={style.list}>
                <ul className={`nav nav-pills ${style.mid}`}>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#Catgories">Categories</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#Products">Products</a>
                  </li>
                </ul>
                <ul className={style.end}>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleLogout}>Logout</a>
                </li>
                </ul>
              </div> :
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark text-decoration-none" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            }
          
        </div>
      </div>
    </nav>
  )
}
