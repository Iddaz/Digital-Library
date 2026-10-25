import React, { useState } from 'react';
import BackButton from '../../components/Buttons/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    // State variables to store username and password input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hook to redirect the user upon successful login
    const navigate = useNavigate();

    // Function to show error notifications
    const notify = (message) => toast.error(message);

    // Function to login the user
    const handleLoginUser = () => {
        const data = { username, password };

        // Sending a request to the backend server to login the user with the data
        axios
            .post('https://digital-library-frontend-1k69.onrender.com/auth/login', data)
            .then((response) => {
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                axios.defaults.headers.common['Authorization'] =
                    `Bearer ${accessToken}`;

                // Decode token to check if user is admin
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken.admin) {
                    navigate('/admin/library');
                } else {
                    navigate('/library');
                }
            })
            .catch((err) => {
                notify(err.response.data.message);
                console.error(err);
            });
    };

    return (
        <div className='p-4'>
            <BackButton destination='/' />
            <div className='flex flex-col mt-40 mb-20 w-full place-items-center'>
                <span className='text-2xl font-bold mb-3'>Login</span>
                <div className='flex flex-col'>
                    <span className='p-3'>Username</span>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        className='w-70 border border-gray-300 rounded px-3 py-2'
                        placeholder='e.g. dkchin'
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
                        placeholder='e.g. 123676789'
                    />
                </div>
                <button
                    onClick={handleLoginUser}
                    className='mt-6 bg-blue-700 w-70 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4'
                >
                    Login
                </button>
            </div>
            {/* Component to display notifications */}
            <Toaster />
        </div>
    );
};

export default Login;
