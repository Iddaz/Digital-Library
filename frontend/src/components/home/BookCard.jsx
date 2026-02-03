import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenLight } from 'react-icons/pi';
import { BiShow } from 'react-icons/bi';
import { CgUnavailable } from 'react-icons/cg';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import { jwtDecode } from 'jwt-decode';

const BookCard = ({ book, onReserve }) => {
    // State to control the visibility of the book details modal
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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

    return (
        <div
            key={book._id}
            className='h-70 w-70 border-2 border-gray-200 rounded-lg px-4 py-10 my-2 relative hover:shadow-xl content-center flex flex-col justify-center mx-4'
        >
            <div className='flex justify-center items-center gap-x-2'>
                <h2 className='my-1 text-3xl text-gray-700 text-center'>
                    {book.name}
                </h2>
            </div>
            <div className='flex justify-center items-center gap-x-2 mb-4 text-gray-600 text-sm'>
                <h1>By {book.author}</h1>
            </div>
            <div className='flex justify-evenly align-end items-center gap-x-2 mt-4'>
                <BiShow
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={() => setShowModal(true)}
                />
                {/* If the book is taken, show unavailable icon, else show available icon */}
                {isAdmin && (
                    <>
                        <Link to={`/books/edit/${book._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-800 hover:text-black' />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                            <MdOutlineDelete className='text-2xl text-red-800 hover:text-black' />
                        </Link>
                    </>
                )}
            </div>
            {/* Book details modal */}
            {showModal && (
                <BookModal
                    book={book}
                    onClose={() => setShowModal(false)}
                    onReserved={(id) => {
                        setShowModal(false);
                        if (typeof onReserve === 'function') onReserve(id);
                    }}
                />
            )}
        </div>
    );
};

export default BookCard;
