import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from '../Categories/Categories.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Link } from 'react-router-dom';
import Loader from '../Loader';

export default function Categories() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCatgories] = useState([]);

    const getCategories = async () => {
        try{
        const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories/active');
        setCatgories(data.categories);
       
    }catch (err){
        setError('err');
    }finally{
        setLoading(false);
    }
}


    useEffect(() => {
        getCategories();
    }, []);

    if(loading){
        return <Loader />;
    }
    if(error){
        return <div className='alert-danger'>{error}</div>
    }

    return (

        <section className={style.categories} id="Catgories">
            <Swiper

                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={55}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
             // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >

                {
                    categories.map(category =>
                        <SwiperSlide className={style.category} key={category._id}>
                            <Link to={`/CtegoriDetails/${category.id}`} >

                                <img src={category.image.secure_url} alt={category.image} />

                            </Link>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </section>

    )
}
