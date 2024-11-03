import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from 'react'
import { UserContext } from '../../../Component/context/user.jsx';
import style from '../Login/Login.module.css';
import { Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Component/user/Loader.jsx';

export default function Login() {

    const {setIsLogin , setUserData} = useContext(UserContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const schema = yup.object({
        email:yup.string().required().min(10).max(30).email(),
        password:yup.string().min(3).required(),
     });
 
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        onSubmit:login,
        validationSchema:schema,
    });
    async function login(){
        setLoading(true);
        try{
             const {data} = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`,formik.values);
        console.log(data);

        if (data.message=="success"){
            localStorage.setItem("userToken",data.token);
            setIsLogin(true);
            const decoded = jwtDecode(data.token);
            setUserData(decoded);
            toast.success(' You have successfully logged in', {
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
        }}catch(err){
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

    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }


  return (
    <div className={style.body}>
    <div className={style.container}>
            <h1> LOG IN </h1>
            <form onSubmit={formik.handleSubmit}>
        
            <div className="input-group">
                <label htmlFor="email">User Email</label>

                <input type="email"  id="email" 
                placeholder="" onChange={formik.handleChange} name="email"
                 value={formik.email} onBlur={formik.handleBlur}/>


                {formik.touched.email && formik.errors.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}
            </div>

            <div className="input-group">
                <label htmlFor="pass">User Password</label>

                <input type="password"  id="pass" 
                placeholder="" onChange={formik.handleChange} name="password"
                 value={formik.password} onBlur={formik.handleBlur} />

                {formik.touched.password && formik.errors.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}
            </div>

            <button type="submit" > Log in </button>
            <div className={style.links}>
            <Link to={'/ForgetPassword'}>Forget Password ?</Link>
            <Link to={'/Register'}>Don't have an account ?</Link>
            </div>
            </form>
        </div>
        </div>
  )
}
