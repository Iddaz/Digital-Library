import React from 'react';
import BookCard from './BookCard.jsx';

const BookGrid = ({ books, onReserve }) => {
    return (
        <div className='grid w-3/5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex justify-center mx-auto'>
            {/* Going through the list of books and displaying each one of them */}
            {books.map((item) => (
                <BookCard key={item._id} book={item} onReserve={onReserve} />
            ))}
        </div>
    );
};

export default BookGrid;
