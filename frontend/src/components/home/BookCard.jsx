import React from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenLight } from 'react-icons/pi';
import { CgUnavailable } from 'react-icons/cg';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookCard = ({ book }) => {
    return (
        <div
            key={book._id}
            className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        >
            <h4 className='my-4 text-gray-500'>{book._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenLight className='text-red-300 text-2xl' />
                <h2 className='my-1'>{book.name}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                {/* If the book is taken, show unavailable icon, else show
                available icon */}
                {book.taken ? (
                    <CgUnavailable className='text-2xl' />
                ) : (
                    <FaRegCheckCircle className='text-2xl' />
                )}
                {/* If the book.taken is true, display 'Taken', else 'Available' */}
                <h2 className='my-1'>{book.taken ? 'Taken' : 'Available'}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4'>
                {/* Details button */}
                <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                </Link>
                {/* Edit button */}
                <Link to={`/books/edit/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-yellow-800 hover:text-black' />
                </Link>
                {/* Delete button */}
                <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-800 hover:text-black' />
                </Link>
            </div>
        </div>
    );
};

export default BookCard;
