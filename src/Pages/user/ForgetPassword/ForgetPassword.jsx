
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import style from '../ForgetPassword/ForgetPassword.module.css';
import { useFormik } from 'formik';
import { Bounce, toast } from 'react-toastify';
import { useState } from 'react';
import Loader from '../../../Component/user/Loader';

export default function ForgetPassword()  {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
            initialValues:{
                email: '',
            },
            onSubmit: async ()=>{
                setLoading(true);

               try{
                const {data} = await axios.patch(`https://ecommerce-node4.onrender.com/auth/sendcode`,formik.values);
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
                navigate('/Reset');

               }catch(error){
                setError('error');
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
    
                
        
            },

    });

    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }

   

    return (
        <div className={style.parent}>
        <div className={style.container}>
            <h2>Forgot Password</h2>
            <p>Enter your email so you can retrieve your password </p>
              <form onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="your email"
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            
        </div>
        </div>
    );
}

