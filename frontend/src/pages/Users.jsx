import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from '../components/Buttons/LogoutButton';
import { logout } from '../utils/auth';
import BackButton from '../components/Buttons/BackButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import toast from 'react-hot-toast';

const Users = () => {
    // State variables to store profile and users data
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Fetch profile of the logged-in user
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(res.data.user);
            } catch (err) {
                console.warn('Failed to fetch profile', err);
            }
        };
        fetchProfile();
    }, [token]);

    // Fetch all users if the logged-in user is an admin
    useEffect(() => {
        if (profile && profile.admin) {
            const fetchUsers = () => {
                setLoading(true);
                axios
                    .get('/auth/all', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) => {
                        setUsers(res.data.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.warn('Failed to fetch users', err);
                        setLoading(false);
                    });
            };

            fetchUsers();
            const onUsersUpdated = () => fetchUsers();
            window.addEventListener('users-updated', onUsersUpdated);
            return () =>
                window.removeEventListener('users-updated', onUsersUpdated);
        }
    }, [profile, token]);

    if (!token) {
        return <Navigate to='/login' replace />;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // Function to handle user deletion
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }
        try {
            await axios.delete(`/auth/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers((prev) => prev.filter((user) => user._id !== userId));
            window.dispatchEvent(new Event('users-updated'));
            toast.success('User deleted successfully');
        } catch (err) {
            console.log('Failed to delete user', err);
            toast.error('Failed to delete user');
        }
    };

    return (
        <div className='flex w-full flex-col p-4'>
            <div className='flex justify-between items-center mb-4'>
                <BackButton destination='/library' />
                <LogoutButton onLogout={handleLogout} />
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl w-full text-center mt-10'>
                    Admin Panel
                </h1>
                <hr className='w-20 mt-5' />
            </div>
            {loading ? (
                <div className='text-center mt-10'>Loading users...</div>
            ) : users.length === 0 ? (
                <div className='text-center mt-10 text-gray-600'>
                    No users found
                </div>
            ) : (
                <div className='mt-10 flex flex-col items-center w-full'>
                    {/* Function to go through the list of users */}
                    {users.map((user) => {
                        return (
                            <div
                                className='flex justify-between items-center border border-gray-600 rounded-xl p-4 mb-4 w-1/2'
                                key={user._id}
                            >
                                <div className='flex flex-col'>
                                    <h3 className='text-xl font-bold'>
                                        {user.username}
                                    </h3>
                                    <p className='text-gray-500 text-sm'>
                                        {user.name} {user.surname}
                                    </p>
                                    {user.admin && (
                                        <p className='text-orange-600 text-sm font-semibold'>
                                            Admin
                                        </p>
                                    )}
                                </div>
                                {!user.admin && (
                                    <AiOutlineClose
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                        className='cursor-pointer text-xl text-red-500 hover:text-red-700'
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Users;
