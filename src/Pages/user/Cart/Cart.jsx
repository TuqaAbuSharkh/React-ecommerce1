import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../../Component/user/Loader';
import style from '../../..//Pages/user/Cart/Cart.module.css';

export default function Cart() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [products, setProducts] = useState([]);


    const getCart = async () => {
        setLoading(true);
        const token = localStorage.getItem('userToken');
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/cart/`, {
                headers: {
                    'Authorization': `Tariq__${token}`
                }
            });
            console.log(data);
            setData(data);
            setProducts(data.products);
        } catch (error) {
            setError('error');
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        getCart();
    }, []);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div className='alert-danger'>{error}</div>
    }
    const productId = 1;

    // const removeProduct= async(productId)=>{
    //     setLoading(true);
    //     try{
    //         const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`,{productId:productId},{
    //             headers: {
    //                 'Authorization': `Tariq__${token}`
    //             }
    //         });
    //         setData(data);
    //         setProducts(data.products);
    //     } catch (error) {
    //         setError('error');
    //     } finally {
    //         setLoading(false);
    //     }
    //     }
    
    //     useEffect(() => {
    //         remove();
    //     }, []);
    
    //     if (loading) {
    //         return <Loader />;
    //     }
    //     if (error) {
    //         return <div className='alert-danger'>{error}</div>
    //     }

    return (
        <div className={style.Container11}>
            <div className={style.info}>
                <h2>Your Cart</h2>
                <span >Total Items = {data.count}</span>
                <div className={style.total}>   
                <button className={style.order}>Order</button>
                </div>
            </div>
            <div className={style.items}>
                {products.map(product =>

                    <div key={product._id} className={style.item}>
                        <img src={product.details.mainImage.secure_url} alt={product.name} />
                        <div className={style.details}>
                            <h3>{product.details.name}</h3>
                            <span >Price {product.details.finalPrice}</span>
                            <div className={style.quantity}>
                                <span>Quantity </span>
                                <button >-</button>
                                <button >{product.quantity}</button>
                                <button >+</button>
                            </div>
                            <button  className={style.remove}>Remove item</button>
                        </div>
                    </div>
                )}



            </div>
            
        </div>
    )
}
