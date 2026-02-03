import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/Buttons/BackButton.jsx';
import Spinner from '../../components/Spinner.jsx';

const ShowBook = () => {
    const [book, setBook] = useState({});

    // Variable which will show a loading spinner when true
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        // Sending a request to the backend server to get the details of a specific book
        axios
            .get(`http://localhost:8888/books/${id}`)
            .then((res) => {
                setBook(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <BackButton destination='/library' />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {/* Show the loading spinner when 'loading' is true */}
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>
                            Title
                        </span>
                        <span>{book.name}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>
                            Status
                        </span>
                        {/* If 'book.taken' is true display 'Taken' and 'Not taken' if false */}
                        <span>{book.taken ? 'Taken' : 'Not taken'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ShowBook;
