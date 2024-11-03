import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup';
import style from '../Register/Register.module.css';
import { Bounce, toast } from 'react-toastify';
import Loader from '../../../Component/user/Loader';

export default function Register() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const schema = yup.object({
        userName: yup.string().required(),
        email: yup.string().required().min(10).max(30).email(),
        password: yup.string().min(3).required(),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: ''
        },
        onSubmit:async (values)=>{
            try{
                const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, formik.values);
            console.log(data);
             if (data.message == "success") {
                 localStorage.setItem("userToken", data.token);
                 setIsLogin(true);
                 const decoded = jwtDecode(data.token);
                 setUserData(decoded);
                 toast.success(' Your account created successfully ', {
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
                 navigate('/');
             }
            }catch(err){
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
            }
            
            finally{
                setLoading(false);
            }
          },
        validationSchema: schema
    });
    
    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }
    
    return (
        <div className={style.body}>
            <div className={style.container}>
                <h1> Sign Up </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">User Name</label>
                        <input type="text" className="form-control" id="name" placeholder="" onChange={formik.handleChange} name="userName" value={formik.userName} />

                    </div>
                    <div className="input-group">
                        <label htmlFor="email">User Email</label>
                        <input type="email" className="form-control" id="email" placeholder="" onChange={formik.handleChange} name="email" value={formik.email} />

                    </div>
                    <div className="input-group">
                        <label htmlFor="pass">User Password</label>
                        <input type="password" className="form-control" id="pass" placeholder="" onChange={formik.handleChange} name="password" value={formik.password} />

                    </div>

                    <button type="submit" > Creat Account </button>
                </form>
            </div>
        </div>
    )
}
