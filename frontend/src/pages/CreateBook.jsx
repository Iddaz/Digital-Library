import React, { useState } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
    const [name, setName] = useState('');
    const [taken, setTaken] = useState(false);

    // Showing notifications
    const { enqueueSnackbar } = useSnackbar();

    // Variable which will show a loading spinner when true
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to save the new book
    const handleSaveBook = () => {
        const data = { name, taken };
        setLoading(true);

        // Sending a request to the backend server to create a new book with the data
        axios
            .post('http://localhost:8888/books', data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book created successfully', {
                    variant: 'success',
                });
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                enqueueSnackbar('Failed to create book', { variant: 'error' });
                console.error(err);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
            {/* Show the loading spinner when 'loading' is true */}
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Taken?</label>
                <input
                    type='checkbox'
                    checked={taken}
                    onChange={(e) => {
                        setTaken(e.target.value);
                    }}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <button onClick={handleSaveBook} className='bg-sky-300 p-2'>
                Save Book
            </button>
        </div>
    );
};
export default CreateBook;
