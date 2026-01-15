import React, { Component } from 'react';
import BackButton from '../../components/BackButton';

export default class Login extends Component {
    render() {
        return (
            <div className='p-4'>
                <BackButton />
                <div className='flex flex-col mt-40 mb-20 w-full place-items-center'>
                    <span className='text-2xl font-bold mb-3'>Login</span>
                    <div className='flex flex-col'>
                        <span className='p-3'>Username</span>
                        <input
                            type='text'
                            className='w-70 border border-gray-300 rounded px-3 py-2'
                            placeholder='e.g. dkchin'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='p-3'>Password</span>
                        <input
                            type='password'
                            className='w-70 border border-gray-300 rounded px-3 py-2'
                            placeholder='e.g. 123676789'
                        />
                    </div>
                    <button className='mt-6 bg-blue-700 w-70 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4'>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
