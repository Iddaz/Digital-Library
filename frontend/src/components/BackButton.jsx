import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import React from 'react';

export const BackButton = (props) => {
    return <div className='flex'>
        <Link to={props.destination} className='bg-gray-400 text-white px-4 py-1 rounded-lg w-fit'>
            <BsArrowLeft className='text-2xl' />
        </Link>
    </div>;
};

export default BackButton;
