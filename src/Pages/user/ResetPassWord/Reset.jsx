import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup';
import { Bounce, toast } from 'react-toastify';
import style from '../ResetPassWord/Reset.module.css';
import Loader from '../../../Component/user/Loader';


export default function Reset(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            code:'',
        },
        onSubmit: async (values) => {
            try{
                 const {data} = await axios.patch('https://ecommerce-node4.onrender.com/auth/forgotPassword',formik.values);
                 console.log(data);
                 toast.success('Check your email !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    }
                );
                navigate('/');
            }
            catch(err){
                setError('err');
                toast.error('Wrong data!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }finally{
                setLoading(false);
            }
        }
    }
    )
    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }


    return (
    <div className={style.body}>
    <div className={style.container}>
        <h1> Reset Password </h1>
        <form onSubmit={formik.handleSubmit}>

            <div className="input-group">
                <label htmlFor="email">User Email</label>
                <input type="email" className="form-control" id="email" placeholder="" onChange={formik.handleChange} name="email" value={formik.email} />

            </div>
            <div className="input-group">
                <label htmlFor="pass">User Password</label>
                <input type="password" className="form-control" id="pass" placeholder="" onChange={formik.handleChange} name="password" value={formik.password} />

            </div>

            <div className="input-group">
                <label htmlFor="name">Code</label>
                <input type="text" className="form-control" id="code" placeholder="" onChange={formik.handleChange} name="code" value={formik.code} />

            </div>

            <button type="submit" > Reset Password  </button>
        </form>
    </div>
</div>
    )
}