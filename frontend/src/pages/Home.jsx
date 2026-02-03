import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col justify-center w-full place-items-center h-screen'>
            <span className='text-4xl font-bold w-sm text-center mb-7'>
                Welcome to the Virtual Library!
            </span>
            <div className='flex flex-row justify-around'>
                <Link to='/register'>
                    <button className='bg-blue-700 w-30 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2'>
                        Register
                    </button>
                </Link>
                <Link to='/login'>
                    <button className='bg-green-700 w-30 cursor-pointer hover:bg-green-900 text-white font-bold py-2 px-4 rounded'>
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
