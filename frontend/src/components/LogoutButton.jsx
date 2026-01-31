import React from 'react';

const LogoutButton = (props) => {
    return (
        <div className='flex items-center gap-x-4'>
            <button
                onClick={props.onLogout}
                className='bg-red-500 cursor-pointer hover:bg-red-800 text-white px-3 py-1 rounded'
            >
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
