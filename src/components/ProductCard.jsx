import React from "react";
import { assets } from "../assets/assest";
import { UseAppContext } from "../context/AppContext";

const ProductCard = ({product}) => {
   
    const {currency,addToCart,removeFromCart,cartItem,navigate}=UseAppContext();
    

    return product && (
        <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                    
                            <img key={i} src={i < 4 ? assets.starIcon : assets.starDullIcon} alt="star" className="md:w-3.5 w-3" />
                        
                        
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3 text-primary-500">
                    <p className="md:text-xl text-base text-primary-500">
                      {currency}  {product.offerPrice}{" "}<span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div className="text-primary" onClick={(e) => e.stopPropagation()}>
                        {!cartItem[product._id]? (
                            <button className="flex items-center justify-center gap-1 bg-primary-10 border border-primary-40 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium cursor-pointer" onClick={() =>addToCart(product._id)} >
                               <img src={assets.cartIcon} alt="cart" className="w-4" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary-500/25 rounded select-none">
                                <button onClick={() => {removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItem[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
/*
This ProductCard component displays product details such as image, name, category, price, and rating
. Clicking the card navigates to the product details page. It also integrates with the cart: showing
 an Add button if the product isn’t in the cart, or quantity controls if it’s already added. We use 
 context to get shared state and functions like currency, cartItems, addToCart, removeCart, and
  navigate. stopPropagation() ensures button clicks don’t trigger navigation. This component is
   reusable for any product dynamically passed as a prop
*/