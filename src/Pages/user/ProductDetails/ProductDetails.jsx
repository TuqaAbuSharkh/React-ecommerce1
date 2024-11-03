import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import style from '../ProductDetails/ProductDetails.module.css';
import { Bounce, toast } from 'react-toastify';
import Loader from '../../../Component/user/Loader';

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const { productId } = useParams();
    const [subImages, setSubImages] = useState([]);
    const [mainImage, setMainImage] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const getProduct = async () => {
        try{
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
        setProduct(data.product);
        setSubImages(data.product.subImages);
        setMainImage(data.product.mainImage);
        }catch (err){
            setError('err');
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }

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

    return (
        <div className={style.container}>
            <div className={style.Product}>
                <div className={style.images}>
                    <img src={mainImage.secure_url} />
                    <div className={style.sub_images}>
                        {
                            subImages.map(image =>
                                <img key={image.public_id} src={image.secure_url} />
                            )
                        }
                    </div>
                </div>
                <div className={style.details}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <div className={style.price}>
                        <span>Price  {product.price}</span>
                        <span>Final Price  {product.finalPrice}</span>
                    </div>
                    <span >Stock : {product.stock} !</span>
                    <button onClick={addtoCart}>Add to Cart   <FontAwesomeIcon icon={faCartPlus} size='1x' color='#fff' />
                    </button>
                </div>
            </div>
        </div>
    )
}
