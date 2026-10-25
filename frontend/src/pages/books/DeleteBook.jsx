import React, { useState } from 'react';
import BackButton from '../../components/Buttons/BackButton.jsx';
import Spinner from '../../components/Spinner.jsx';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = () => {
    // Variable which will show a loading spinner when true
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // Function to delete a book
    const handleDeleteBook = () => {
        setLoading(true);

        // Sending a request to the backend server with the id of the book and deleting it
        axios
            .delete(`https://digital-library-frontend-1k69.onrender.com/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/library');
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton destination='/library' />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {/* Show the loading spinner when 'loading' is true */}
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col items-center border-2 border-black rounded-xl w-600px p-8 mx-auto'>
                    <h3 className='text-2xl'>
                        Are you sure you want to delete this book?
                    </h3>

                    <button
                        className='p-4 cursor-pointer bg-red-600 text-white m-8 w-full'
                        onClick={handleDeleteBook}
                    >
                        Yes
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteBook;
