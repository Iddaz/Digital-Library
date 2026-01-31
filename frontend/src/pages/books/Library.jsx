// ...existing code...
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../../components/home/BookTable';
import BookGrid from '../../components/home/BooksGrid';
import LogoutButton from '../../components/LogoutButton';

const Library = () => {
    const [books, setBooks] = useState([]);

    // Variable which will show a loading spinner when true
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    // Hook to redirect the user upon logout
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    // Function to logout the user
    const handleLogout = () => {
        const refresh = localStorage.getItem('refreshToken');

        // Call backend to invalidate refresh token
        axios
            .delete('/auth/logout', { data: { token: refresh } })
            .catch((err) => console.warn('Logout request failed', err))
            .finally(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                delete axios.defaults.headers.common['Authorization'];
                navigate('/login');
            });
    };

    return (
        <div className='p-4'>
            {/* Buttons to switch between table and card view of the books */}
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <LogoutButton onLogout={handleLogout} />
            </div>

            {/* Show the loading spinner when 'loading' is true. Then, display the view of the books in the chosen way */}
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <BookTable books={books} />
            ) : (
                <BookGrid books={books} />
            )}
            
            <div className='fixed right-10'>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
        </div>
    );
};
export default Library;
