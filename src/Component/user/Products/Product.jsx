import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import style from '../Products/Product.module.css';
import { Bounce, toast } from 'react-toastify';
import Loader from '../Loader';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [numOfPages, setNumOfPages ] = useState(1);
    const [page , setPage] = useState(1);
    const { productId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const getProducts = async () => {
        try{
        const limit = 4;

        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=${page}&limit=${limit}`);

        const total = data.total;
        const NumOfPages = Math.ceil(total / limit);
        setNumOfPages(NumOfPages);
        setProducts(data.products);
        }catch (err){
            setError('err');
        }finally{
            setLoading(false);
        }
            
    }

    useEffect(() => {
        getProducts();
    }, [page]);


    const ChangePage = (newPage)=>{
        console.log(page);
        setPage(newPage);
        getProducts();
       
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
    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }

    return (
        <>
            <div className={style.container} id="Products">

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

        
            <div className={style.pagination_container}>
                <ul className={style.pagination}>
                    <li className={style.page_item}>
                        <button 
                            onClick={() => ChangePage(page - 1)}
                            className={style.page_link}
                            disabled={page <= 1}
                        >
                            {'<'}
                        </button>
                    </li>
                    {[...Array(numOfPages)].map((_, i) => (
                        <li className={style.page_item} key={i + 1}>
                            <button 
                                onClick={() => ChangePage(i + 1)}
                                className={style.page_link}
                                disabled={page === i + 1}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={style.page_item}>
                        <button 
                            onClick={() => ChangePage(page + 1)}
                            className={style.page_link}
                            disabled={page >= numOfPages}
                        >
                            {'>'}
                        </button>
                    </li>
                </ul>
            </div>
        </>

    )
}
