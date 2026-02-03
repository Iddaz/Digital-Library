import React from 'react';

const LogoutButton = (props) => {
    return (
        <div className='flex items-center gap-x-4'>
            <button
                onClick={props.onLogout}
                className='bg-orange-400 cursor-pointer hover:bg-orange-500 px-3 py-1 rounded h-10 w-27'
            >
                Log Out
            </button>
        </div>
    );
};

export default LogoutButton;
