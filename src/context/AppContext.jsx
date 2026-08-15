import { createContext, useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast}from 'react-hot-toast';
import axios from "axios";

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL 
const AppContext=createContext();
export const AppContextProvider=({children})=>{
    const currency=import.meta.env.VITE_CURRENCY ||'$'
    const navigate=useNavigate();
    const [user,setUser]=useState(false);
    const [showUserLogin,setShowUserLogin]=useState(false);
    const [searchQuery,setSearchQuery]=useState("");
    const [cartItem,setCartItem]=useState([]);
    const [products,setProducts]=useState([]);
    const [isSeller,setIsSeller]=useState(false);

    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItem){
            totalCount+=cartItem[item];
        }
        return totalCount;
    }
     const fetchSellerStatus=async()=>{
    try{
        
       const {data}=await axios.get('/api/seller/is-auth');
       if(data.success){
        setIsSeller(true)
    }
    else{
        setIsSeller(false)
    }
  }
    catch(error){
        setIsSeller(false);
    }
   }
    const fetchProduct=async()=>{
        try{
            const {data}=await axios.get("/api/product/productList");
            if(data.success){
                setProducts(data.products);
            }else(toast(data.message));
        }catch(error){
            toast(error.message);
        }
    }
    const addToCart=(itemId)=>{
        try{
           let cartData=structuredClone(cartItem);
           if(cartData[itemId]){
            cartData[itemId]+=1
           }else{
            cartData[itemId]=1
           }
           setCartItem(cartData);
           toast.success("item added successfully")
        }catch(error){
           toast(error.message);
        }
    }
    const updateCartItem=(itemId,quantity)=>{
        try{
           let cartData=structuredClone(cartItem);
           cartData[itemId]=quantity;
           setCartItem(cartData);
           toast.success("item updated successfully")
        }catch(error){
            toast(error.message)
        }
    }
    const removeFromCart=(itemId)=>{
        try{
           let cartData=structuredClone(cartItem);
           if(cartData[itemId]){
            cartData[itemId]-=1
            if(cartData[itemId]===0)delete(cartData[itemId]);
           }
           setCartItem(cartData);
           toast.success("item removed successfully")
        }catch(error){
           toast(error.message);
        }
    }
    const fetchUserAuth=async()=>{
    try{
      const {data}=await axios.get('/api/user/isAuth');
      if (data.success) {
            setUser(data.user);
            setCartItem(data.user.cartItems || {});
        }
    }catch(error){
         setUser(null);
    }
    }
    useEffect(() => {
    const updateCart = async () => {
        try {
            const { data } = await axios.post('/api/cart/update', {
                cartItems: cartItem,
                userId: user?._id
            });

            if (!data.success) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (user && cartItem) {
        updateCart();
    }
}, [cartItem, user]);
     useEffect(()=>{
        fetchUserAuth();
        fetchSellerStatus();
        fetchProduct();
        
    },[])
    

    

    const value={user,setUser,showUserLogin,setShowUserLogin,searchQuery,setSearchQuery,axios
        ,getCartCount,cartItem,setCartItem,navigate,addToCart,removeFromCart,fetchUserAuth,setIsSeller,isSeller
    ,products,setProducts ,updateCartItem,fetchProduct,currency};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>


}
export const UseAppContext=()=>{
    return useContext(AppContext) ;
}
