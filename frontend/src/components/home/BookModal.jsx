import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { CgUnavailable } from 'react-icons/cg';
import { FaRegCheckCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BookModal = ({ book, onClose, onReserved }) => {
    // State to check if the user is admin
    const [isAdmin, setIsAdmin] = React.useState(false);

    // Function to show  notifications
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

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
    }, []);

    // Handle book reservation logic here
    const handleReservation = () => {
        const bookId = book._id || book.id;

        axios
            .put(`https://digital-library-frontend-1k69.onrender.com/books/reserve/${bookId}/`)
            .then((response) => {
                console.log('Reservation successful:', response.data);
                if (typeof onReserved === 'function') onReserved(bookId);
                onClose();
                notifySuccess('Book reserved successfully!');
            })
            .catch((error) => {
                console.error('Error reserving book:', error);
                notifyError(
                    'Failed to reserve the book. Check your reservation limit.',
                );
            });
    };

    // Handle returning/unreserving a book
    const handleReturn = () => {
        const bookId = book._id || book.id;
        const payload = {
            name: book.name,
            author: book.author,
            description: book.description,
            taken: false,
        };

        axios
            .put(`https://digital-library-frontend-1k69.onrender.com/books/${bookId}`, payload)
            .then((response) => {
                console.log('Return successful:', response.data);
                // notify other parts of the app to refresh
                window.dispatchEvent(new Event('books-updated'));
                window.dispatchEvent(new Event('profile-updated'));
                onClose();
                notifySuccess('Book returned successfully!');
            })
            .catch((error) => {
                console.error('Error returning book:', error);
                notifyError('Failed to return the book.');
            });
    };

    return (
        <div
            className='fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                className='w-[600px] max-w-full h-[430px] bg-white rounded-xl p-15 flex flex-col relative'
                onClick={(event) => event.stopPropagation()}
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <div className='flex justify-start items-center'>
                    <h2 className='my-1 text-4xl mt-7 font-bold'>
                        {book.name}
                    </h2>
                </div>
                <div className='flex justify-start items-center'>
                    <h2 className='my-1 text-l text-gray-700 my-2'>
                        By {book.author}
                    </h2>
                </div>
                <hr className='border-gray-500 w-10' />
                <div className='flex justify-start items-center gap-x-2 mt-5'>
                    {/* If the book is taken, show unavailable icon, else show
                            available icon */}
                    {book.taken ? (
                        <CgUnavailable className='text-2xl' />
                    ) : (
                        <FaRegCheckCircle className='text-2xl' />
                    )}
                    {/* If the book.taken is true, display 'Taken', else 'Available' */}
                    <h2 className='my-1'>
                        {book.taken ? 'Taken' : 'Available'}
                    </h2>
                </div>
                <p className='my-4 text-gray-700'>{book.description}</p>
                {/* Show reserve/return button only for non-admin users */}
                {!isAdmin &&
                    (book.taken ? (
                        <button
                            onClick={handleReturn}
                            className='bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'
                        >
                            Return
                        </button>
                    ) : (
                        <button
                            onClick={handleReservation}
                            className='bg-black cursor-pointer hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4'
                        >
                            Reserve
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default BookModal;
