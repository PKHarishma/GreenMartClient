 import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assest'
import { UseAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const InputField = ({
    type = "text",
    placeholder,
    name,
    handleChange,
    address
}) => {
    return (
        <input
            className='w-full px-2 py-2.5 border border-gray-300 outline-none text-gray-500 focus:border-primary transition'
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />
    )
}

const AddAddress = () => {

    const { axios, user, navigate } = UseAppContext();

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first");
            navigate("/");
            return;
        }

        try {

            const { data } = await axios.post(
                "/api/address/add",
                {
                    
                    ...address
                }
            );

            if (data.success) {
                toast.success(data.message);
                navigate("/cart");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!user) {
            toast.error("Please login first");
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='mt-16 pb-16'>

            <p className='text-2xl md:text-3xl text-gray-500'>
                Add Shipping{" "}
                <span className='font-semibold text-primary'>
                    Address
                </span>
            </p>

            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>

                {/* FORM */}
                <div className='flex-1 max-w-md'>

                    <form
                        onSubmit={onSubmitHandler}
                        className='space-y-3 mt-6 text-sm'
                    >

                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='firstName'
                                placeholder='First name'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='lastName'
                                placeholder='Last name'
                            />

                        </div>

                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='email'
                                placeholder='Email'
                                type='email'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='streetAddress'
                                placeholder='Street address'
                            />

                        </div>

                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='city'
                                placeholder='City'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='state'
                                placeholder='State'
                            />

                        </div>

                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='zipcode'
                                placeholder='Zip code'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='country'
                                placeholder='Country'
                            />

                        </div>

                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='phone'
                            placeholder='Phone number'
                        />

                        <button
                            type='submit'
                            className='w-full py-2.5 bg-primary text-white font-medium hover:bg-primary-dull transition'
                        >
                            Save Address
                        </button>

                    </form>

                </div>

                {/* IMAGE */}
                <img
                    src={assets.addAddressImage}
                    alt="Add Address"
                />

            </div>

        </div>
    );
}

export default AddAddress;