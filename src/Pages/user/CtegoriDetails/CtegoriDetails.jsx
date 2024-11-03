import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import style from '../CtegoriDetails/CtegoriDetails.module.css';
import { Bounce, toast } from 'react-toastify';
import Loader from '../../../Component/user/Loader';

export default function CtegoriDetails() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { CategoryId } = useParams();


    const getProducts = async () => {
        try{
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${CategoryId}`);
        setProducts(data.products);}
        catch(error){
            setError(error);
        }finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        getProducts();
    }, []);
    const { productId } = useParams();

    const addtoCart = async () => {
        try{
        const token = localStorage.getItem("userToken");
        const {data}= await axios.post(`https://ecommerce-node4.onrender.com/cart/`,{
            productId: productId},
        {
            headers: {
                Authorization: `Tariq__${token}`
            }
        })
        console.log(data);
        toast.success('product added to cart ', {
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
    }catch{
        toast.error('Product already exsist !', {
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
    }

    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }

    return (
        <>

         { ( products == [])? <h2>No products</h2> :
            <div className={style.container}>

                {products.map(product =>
                    <div className={style.card} key={product._id}>
                        <img src={product.mainImage.secure_url} />
                        <div className={style.card_body}>

                            <h3>{product.name.split(' ').slice(0, 6).join(' ')}</h3>
                            <div className={style.price}>
                                <span >{product.price}</span>
                                <span>{product.finalPrice}</span>
                            </div>
                            <div className={style.card_footer}>
                                <Link to={`/ProductDetails/${product._id}`} className={style.btn}>Details</Link>
                                <button className={style.btn}  onClick={addtoCart}>Add to Cart  <FontAwesomeIcon icon={faCartPlus} size='1x' color='#fff' /></button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
}


            

        </>

    )
}
