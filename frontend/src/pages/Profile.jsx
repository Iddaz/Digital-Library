import React, { useState, useEffect } from 'react';
import LogoutButton from '../components/Buttons/LogoutButton';
import { logout } from '../utils/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/Buttons/BackButton';
import { AiOutlineClose } from 'react-icons/ai';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Profile fetched:', res.data.user);
                setProfile(res.data.user);
            } catch (err) {
                console.warn('Failed to fetch profile', err);
            }
        };
        fetchProfile();

        const onProfileUpdated = () => fetchProfile();
        window.addEventListener('profile-updated', onProfileUpdated);
        return () =>
            window.removeEventListener('profile-updated', onProfileUpdated);
    }, [token]);

    if (!token) {
        return <Navigate to='/login' replace />;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleRemoveBook = async (bookId) => {
        try {
            await axios.put(
                `/books/remove/${bookId}`,
                { taken: false },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setProfile((prev) => ({
                ...prev,
                books: prev.books.filter((book) => book._id !== bookId),
            }));
        } catch (err) {
            console.log('Failed to remove book from profile', err);
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
                    Welcome, {profile?.username || 'User'}!
                </h1>
                <hr className='w-20 mt-5' />
                <h2 className='mt-4'>
                    Your reserved books: {profile?.books?.length ?? 0}/3
                </h2>
            </div>
            <div className='mt-10 flex flex-col items-center w-full'>
                {/* Function to go through the list of reserved books */}
                {profile?.books?.map((book) => {
                    return (
                        <div
                            className='flex justify-between border border-gray-600 rounded-xl p-4 mb-4 w-1/2'
                            key={book._id}
                        >
                            <div className='flex'>
                                <h3 className='text-xl font-bold'>
                                    {book.name}
                                </h3>
                                <p className='text-gray-500 ml-10'>
                                    by {book.author}
                                </p>
                            </div>
                            <AiOutlineClose
                                onClick={() => handleRemoveBook(book._id)}
                                className='cursor-pointer text-xl text-red-500'
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile;
