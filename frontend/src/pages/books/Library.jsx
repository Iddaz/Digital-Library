import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../../components/home/BookTable';
import BookGrid from '../../components/home/BooksGrid';
import LogoutButton from '../../components/Buttons/LogoutButton';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from 'react-hot-toast';
import { logout } from '../../utils/auth';
import ProfileButton from '../../components/Buttons/ProfileButton';
import UsersButton from '../../components/Buttons/UsersButton';

const Library = () => {
    const [books, setBooks] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Variable which will show a loading spinner when true
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        // Decode token to get admin status
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setIsAdmin(decodedToken.admin === true);
            } catch (err) {
                console.log('Error decoding token:', err);
            }
        }
        const fetchBooks = () => {
            setLoading(true);
            // Sending a request to the backend server to get the list of books
            axios
                .get('http://localhost:8888/books')
                .then((res) => {
                    setBooks(res.data.data);
                    console.log(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };

        fetchBooks();

        const onBooksUpdated = () => fetchBooks();
        window.addEventListener('books-updated', onBooksUpdated);
        return () =>
            window.removeEventListener('books-updated', onBooksUpdated);
    }, []);

    const handleBookReserved = (bookId) => {
        setBooks((prev) =>
            prev.map((b) =>
                b._id === bookId || b.id === bookId ? { ...b, taken: true } : b,
            ),
        );
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className='p-4'>
            {/* Buttons to switch between table and card view of the books */}
            <div className='flex justify-between items-center gap-x-4'>
                <div className='w-35 flex justify-between'>
                    <button
                        className='bg-sky-300 cursor-pointer hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('table')}
                    >
                        Table
                    </button>
                    <button
                        className='bg-sky-300 cursor-pointer hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('card')}
                    >
                        Card
                    </button>
                </div>
                <div className='flex gap-x-4'>
                    {!isAdmin ? <ProfileButton /> : <UsersButton />}
                    <LogoutButton
                        className='fixed right-2 top-2'
                        onLogout={handleLogout}
                    />
                </div>
            </div>
            <div className='flex w-full justify-center'>
                {isAdmin ? (
                    <h1 className='text-3xl mt-4'>Admin Library</h1>
                ) : (
                    <h1 className='text-3xl mt-4'>Library</h1>
                )}
            </div>
            <div className='w-full flex justify-center'>
                <hr className='w-15 border-t-2 border-gray-400 my-5' />
            </div>

            {/* Show the loading spinner when 'loading' is true. Then, display the view of the books in the chosen way */}
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <BookTable books={books} onReserve={handleBookReserved} />
            ) : (
                <BookGrid books={books} onReserve={handleBookReserved} />
            )}

            {/* Show the add book button only for admin users */}
            {isAdmin && (
                <div className='fixed right-10'>
                    <Link to='/books/create'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
                </div>
            )}
            <Toaster />
        </div>
    );
};
export default Library;
