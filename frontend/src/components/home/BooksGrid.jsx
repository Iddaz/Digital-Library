import React from 'react';
import BookCard from './BookCard.jsx';

const BookGrid = ({ books }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
            {/* Going through the list of books and displaying each one of them */}
            {books.map((item) => (
                <BookCard key={item._id} book={item} />
            ))}
        </div>
    );
};

export default BookGrid;
