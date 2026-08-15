import React from 'react'
import { assets } from '../assets/assest'
import { NavLink } from "react-router-dom"
import { UseAppContext } from '../context/AppContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const NavBar = () => {

    const [open, setOpen] = useState(false)

    const {
        user,
        setUser,
        showUserLogin,
        setShowUserLogin,
        searchQuery,
        setSearchQuery,
        navigate,
        axios,
        getCartCount
    } = UseAppContext()

    const logOut = async () => {
        try {
            const { data } = await axios.get('/api/user/logOut')

            if (data.success) {
                toast.success(data.message)
                setUser(false)
                navigate('/')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery])

    return (

        <nav className="flex items-center justify-between mb-3 border-b border-gray-300 bg-white relative transition-all mx-15 my-7">

            {/* Logo */}
            <div className='p-3'>
                <img src={assets.logo} alt="logo" />
            </div>


            {/* Desktop Navbar */}
            <div className='hidden sm:flex items-center gap-8'>

                <NavLink to='/'>
                    Home
                </NavLink>

                <NavLink to='/products'>
                    AllProduct
                </NavLink>

                <NavLink to='/'>
                    Contact
                </NavLink>


                {/* Search */}
                <div className="relative hidden lg:flex border border-gray-300 rounded-full px-3">

                    <input
                        type="text"
                        placeholder="Search products"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-1.5 pr-10 bg-transparent outline-none placeholder-gray-500"
                    />

                    <img
                        src={assets.searchIcon}
                        alt="search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    />

                </div>


                {/* Cart */}
                <div
                    className='relative cursor-pointer'
                    onClick={() => navigate("/cart")}
                >

                    <img
                        src={assets.cartIcon}
                        alt="cartIcon"
                    />

                    <button className='absolute -top-2 -right-2 bg-primary rounded-full'>
                        {getCartCount()}
                    </button>

                </div>


                {/* Login / Profile */}
                {!user ? (

                    <button
                        onClick={() => {
                            setShowUserLogin(true)
                        }}
                        className='border rounded-full text-white bg-primary px-8 py-2 border-transparent cursor-pointer'
                    >
                        Login
                    </button>

                ) : (

                    <div className='relative group'>

                        {/* Profile Icon */}
                        <img
                            src={assets.profileIcon}
                            alt="profileIcon"
                            className="w-8 h-8 cursor-pointer"
                        />

                       
                        {/* Profile Dropdown */}
<ul className="hidden group-hover:block absolute right-0 top-8 pt-2 bg-transparent w-32 z-50">

    <div className="bg-white shadow border border-gray-200 py-2 rounded-md text-sm">

        <li
            onClick={() => navigate("/my-orders")}
            className="p-2 pl-3 hover:bg-primary/10 cursor-pointer"
        >
            My Orders
        </li>

        <li
            onClick={logOut}
            className="p-2 pl-3 hover:bg-primary/10 cursor-pointer"
        >
            LogOut
        </li>

    </div>

</ul>

                    </div>

                )}

            </div>


            {/* Mobile Navbar */}
            <div className='sm:hidden flex items-center gap-8'>

                {/* Mobile Cart */}
                <div
                    className='relative cursor-pointer'
                    onClick={() => navigate("/cart")}
                >

                    <img
                        src={assets.cartIcon}
                        alt="cartIcon"
                    />

                    <button className='absolute -top-2 -right-2 bg-primary rounded-full'>
                        {getCartCount()}
                    </button>

                </div>


                {/* Menu Button */}
                <button
                    onClick={() => open ? setOpen(false) : setOpen(true)}
                    aria-label="Menu"
                >

                    {!open && (
                        <img
                            src={assets.menuIcon}
                            alt="menu"
                        />
                    )}

                </button>


                {/* Mobile Menu */}
                {open && (

                    <div className="absolute top-15 left-0 w-full bg-white shadow-md py-4 px-10 flex flex-col items-start gap-3">

                        <NavLink
                            to='/'
                            onClick={() => setOpen(false)}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to='/product'
                            onClick={() => setOpen(false)}
                        >
                            AllProduct
                        </NavLink>

                        {user && (
                            <NavLink
                                to='/my-orders'
                                onClick={() => setOpen(false)}
                            >
                                MyOrder
                            </NavLink>
                        )}

                        <NavLink
                            to='/'
                            onClick={() => setOpen(false)}
                        >
                            Contact
                        </NavLink>


                        {/* Mobile Login / Logout */}
                        {!user ? (

                            <button
                                onClick={() => {
                                    setOpen(false)
                                    setShowUserLogin(true)
                                }}
                                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                            >
                                Login
                            </button>

                        ) : (

                            <button
                                onClick={() => {
                                    setOpen(false)
                                    logOut()
                                }}
                                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                            >
                                LogOut
                            </button>

                        )}

                    </div>

                )}

            </div>

        </nav>
    )
}

export default NavBar