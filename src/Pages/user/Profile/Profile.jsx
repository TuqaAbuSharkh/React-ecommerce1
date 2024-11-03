import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../../Component/user/Loader';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const profile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/user/profile`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            console.log(data);
            setUser(data.user);
        }
        catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        profile();
    }, []);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div className='alert-danger'>{error}</div>
    }
 

    return (
        <div className='py-3'>
  <div className="card mx-auto" style={{width: '18rem'}}>
    <img src='../user.jpg' className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title"> {user.userName}</h5>
      <p className="card-text">{user.email}</p>
      <Link to ='/Cart' className="btn btn-outline-success">My Cart  <FontAwesomeIcon icon={faCartPlus} size='1x'  /></Link>
   
    </div>
  </div>
  </div>
  )


}
