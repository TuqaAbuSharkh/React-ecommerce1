import { createBrowserRouter } from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./Pages/user/Home/Home.jsx";
import Login from "./Pages/user/Login/Login.jsx";
import Register from "./Pages/user/Register/Register.jsx";
import Reset from "./Pages/user/ResetPassWord/Reset.jsx";
import CtegoriDetails from "./Pages/user/CtegoriDetails/CtegoriDetails.jsx";

import UserContextProvider from "./Component/context/user.jsx";
import ForgetPassword from "./Pages/user/ForgetPassword/ForgetPassword.jsx";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from "./Pages/user/ProductDetails/ProductDetails.jsx";
import Cart from "./Pages/user/Cart/Cart.jsx";
import Profile from "./Pages/user/Profile/Profile.jsx";



const router = createBrowserRouter([
    {

    path:'/',
    element:
    <UserContextProvider>
        <Root />
        <ToastContainer />
    </UserContextProvider>
    ,
    children:[
        {
            path:'/',
            element:<Home />
        },
        {
            path:'/Login',
            element:
            <UserContextProvider>
                 <Login />
            </UserContextProvider>
           
        }
        ,{
            path:'/Register',
            element:
            <UserContextProvider>
                  <Register />
            </UserContextProvider>
        }
        ,{
            path:'/ForgetPassword',
            element:
            <UserContextProvider>
                 <ForgetPassword />
            </UserContextProvider>
        },
        {
            path:'/Reset',
            element:
            <UserContextProvider>
                 <Reset/>
            </UserContextProvider>     
        }
        ,{
            path: '/CtegoriDetails/:CategoryId',
            element: 
            <UserContextProvider>
                <CtegoriDetails />
            </UserContextProvider>
        },
        {
            path: '/ProductDetails/:productId',
            element: 
            <UserContextProvider>
                <ProductDetails />
            </UserContextProvider>
        }
        ,{
            path: '/cart',
            element:
            <UserContextProvider>
                <Cart />
            </UserContextProvider>
        },
        {
            path: '/Profile',
            element:
            <UserContextProvider>
                <Profile />
            </UserContextProvider>
        }
    ]

}
]);
export default router;