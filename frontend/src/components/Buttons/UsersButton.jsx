import React from 'react';
import { Link } from 'react-router-dom';

const UsersButton = () => {
    return (
        <Link to='/admin/users'>
            <button className='bg-sky-300 cursor-pointer hover:bg-sky-600 px-4 py-1 rounded-lg'>
                Users
            </button>
        </Link>
    );
};

export default UsersButton;
