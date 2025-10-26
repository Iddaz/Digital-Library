import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BookTable = ({ books }) => {
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>No</th>
                    <th className='border border-slate-600 rounded-md'>Name</th>
                    <th className='border border-slate-600 rounded-md'>
                        Taken
                    </th>
                    <th className='border border-slate-600 rounded-md'>
                        Operations
                    </th>
                </tr>
            </thead>
            <tbody>
                {/*  Going through the list of all books and displaying them in a
                table */}
                {books.map((book, index) => (
                    <tr key={book._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {index + 1}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {book.name}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {/* If the book.taken is true, display 'Yes', else
                            'No' */}
                            {book.taken ? 'Yes' : 'No'}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;
