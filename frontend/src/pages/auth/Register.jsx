import React, { Component, useState } from 'react';
import BackButton from '../../components/Buttons/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    // State variables to hold the input values
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Navigation hook to redirect users after registration
    const navigate = useNavigate();

    // Function to show error notifications
    const notify = (message) => toast.error(message);

    // Function to save the new user
    const handleSaveUser = () => {
        const data = { name, surname, username, password, confirmPassword };

        // Sending a request to the backend server to create a new user with the data
        axios
            .post('/auth/register', data)
            .then(() => {
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                notify(
                    err.response?.data?.message ??
                        'Unable to register. Please check your connection and try again.',
                );
            });
    };

    return (
        <div className='p-4'>
            <BackButton destination='/' />
            <div className='flex flex-col mt-30 w-full place-items-center mb-20'>
                <span className='text-2xl font-bold mb-3'>Register</span>
                <div className='flex'>
                    <div className='flex flex-col'>
                        <span className='p-3'>Name</span>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className='w-33 border border-gray-300 rounded px-3 py-2 mr-4'
                            placeholder='e.g. Selim'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='p-3'>Surname</span>
                        <input
                            type='text'
                            value={surname}
                            onChange={(e) => {
                                setSurname(e.target.value);
                            }}
                            className='w-33 border border-gray-300 rounded px-3 py-2'
                            placeholder='e.g. Mashkov'
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='p-3'>Username</span>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        className='w-70 border border-gray-300 rounded px-3 py-2'
                        placeholder='e.g. luciatruno'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='p-3'>Password</span>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className='w-70 border border-gray-300 rounded px-3 py-2'
                        placeholder='e.g. 123456767'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='p-3'>Confirm Password</span>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        className='w-70 border border-gray-300 rounded px-3 py-2'
                        placeholder='e.g. 123456767'
                    />
                </div>
                <button
                    onClick={handleSaveUser}
                    className='mt-6 bg-blue-700 w-70 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4'
                >
                    Register
                </button>
            </div>
            {/* Component to display notifications */}
            <Toaster />
        </div>
    );
};

export default Register;
