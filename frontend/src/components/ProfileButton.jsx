import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const ProfileButton = () => {
    return (
        <Link to='/profile'>
            <CgProfile className='text-4xl cursor-pointer' />
        </Link>
    );
};

export default ProfileButton;
