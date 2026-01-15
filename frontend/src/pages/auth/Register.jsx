import React, { Component } from 'react';
import BackButton from '../../components/BackButton';

export default class Register extends Component {
    render() {
        return (
            <div className='p-4'>
                <BackButton />
                <div className='flex flex-col mt-30 w-full place-items-center mb-20'>
                    <span className='text-2xl font-bold mb-3'>Register</span>
                    <div className='flex'>
                        <div className='flex flex-col'>
                            <span className='p-3'>Name</span>
                            <input
                                type='text'
                                className='w-33 border border-gray-300 rounded px-3 py-2 mr-4'
                                placeholder='e.g. Selim'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className='p-3'>Surname</span>
                            <input
                                type='text'
                                className='w-33 border border-gray-300 rounded px-3 py-2'
                                placeholder='e.g. Mashkov'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='p-3'>Username</span>
                        <input
                            type='text'
                            className='w-70 border border-gray-300 rounded px-3 py-2'
                            placeholder='e.g. luciatruno'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='p-3'>Password</span>
                        <input
                            type='password'
                            className='w-70 border border-gray-300 rounded px-3 py-2'
                            placeholder='e.g. 123456767'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='p-3'>Confirm Password</span>
                        <input
                            type='password'
                            className='w-70 border border-gray-300 rounded px-3 py-2'
                            placeholder='e.g. 123456767'
                        />
                    </div>
                    <button className='mt-6 bg-blue-700 w-70 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4'>
                        Register
                    </button>
                </div>
            </div>
        );
    }
}
