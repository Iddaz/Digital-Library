import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import { BiShow } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';
const BookTable = ({ books, onReserve }) => {
    // State to control the visibility of the book details modal
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Function to handle showing the modal with selected book details
    const handleShowModal = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

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
        <div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>
                            Name
                        </th>
                        <th className='border border-slate-600 rounded-md'>
                            Author
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/*  Going through the list of all books and displaying them in a
                table */}
                    {books.map((book) => (
                        <tr key={book._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {book.name}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {book.author}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <BiShow
                                        className='text-2xl text-blue-800 hover:text-black cursor-pointer'
                                        onClick={() => handleShowModal(book)}
                                    />
                                    {isAdmin && (
                                        <div className='flex justify-evenly align-end items-center gap-x-2'>
                                            <Link
                                                to={`/books/edit/${book._id}`}
                                            >
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link
                                                to={`/books/delete/${book._id}`}
                                            >
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Book details modal */}
            {showModal && selectedBook && (
                <BookModal
                    book={selectedBook}
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

export default BookTable;
