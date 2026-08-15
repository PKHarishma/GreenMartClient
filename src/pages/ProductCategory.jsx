import React from 'react'
import { UseAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories } from '../assets/assest'

const ProductCategory = () => {
    const {products}=UseAppContext();
    const {category}=useParams();
    const searchCategory=categories.find((item)=>item.path.toLowerCase()===category.toLowerCase())
    const filterProducts=products.filter((product)=>product.category.toLowerCase()===category.toLowerCase());
  return (
    <div className='mt-16'>
        {searchCategory && (
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'>{category.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
        )}
        {filterProducts.length>0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-3 md:gap-6 '>
                {filterProducts.map((product)=>{
                   return <ProductCard key={product._id} product={product}/>
                })}
            </div>
        ):(
            <div className='flex flex-col items-center justify-center h=[60vh]'>
               <p className='text-2xl font-medium text-primary'>No Products Found In This Category</p>
            </div>
        )}
    </div>

  )
}

export default ProductCategory  