import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { CgUnavailable } from 'react-icons/cg';
import { FaRegCheckCircle } from 'react-icons/fa';

const BookModal = ({ book, onClose }) => {
    return (
        <div
            className='fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
                onClick={(event) => event.stopPropagation()}
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h4 className='my-4 text-gray-500'>{book._id}</h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-red-300 text-2xl' />
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
                    <h2 className='my-1'>
                        {book.taken ? 'Taken' : 'Available'}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
