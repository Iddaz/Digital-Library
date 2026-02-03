import React, { useState } from 'react';
import BackButton from '../../components/Buttons/BackButton.jsx';
import Spinner from '../../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    // State variables to store book name and taken status
    const [name, setName] = useState('');
    const [taken, setTaken] = useState(false);
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // Hook to redirect the user upon successful book creation
    const navigate = useNavigate();

    // Function to save the new book
    const handleSaveBook = () => {
        const data = { name, author, description, taken };
        setLoading(true);
        // Sending a request to the backend server to create a new book with the data
        axios
            .post('http://localhost:8888/books', data)
            .then(() => {
                setLoading(false);
                navigate('/library');
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <div className='p-4 '>
            <BackButton destination='/library' />
            <div className='w-full flex justify-center mt-7'>
                <div className='flex flex-col w-1/2 items-center border border-gray-600 rounded-xl p-4'>
                    <h1 className='text-3xl my-4'>Create a New Book</h1>
                    {loading && <Spinner />}
                    {/* Show the loading spinner when 'loading' is true */}
                    <div className='flex flex-col w-[600px]'>
                        <div className='my-4'>
                            <label className='text-xl mr-4 text-gray-500'>
                                Name
                            </label>
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
                    <div className='flex flex-col w-[600px]'>
                        <div className='my-4'>
                            <label className='text-xl mr-4 text-gray-500'>
                                Author
                            </label>
                            <input
                                type='text'
                                value={author}
                                onChange={(e) => {
                                    setAuthor(e.target.value);
                                }}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-[600px]'>
                        <div className='my-4'>
                            <label className='text-xl mb-4 text-gray-500'>
                                Description
                            </label>
                            <input
                                type='text'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            />
                        </div>
                    </div>
                    <div className='my-4 flex w-full ml-50 justify-start'>
                        <input
                            type='checkbox'
                            checked={taken}
                            onChange={(e) => {
                                setTaken(e.target.checked);
                            }}
                            className='border-2 border-gray-500 mr-4'
                        />
                        <label className='text-xl text-gray-500'>Taken?</label>
                    </div>
                    <button
                        onClick={handleSaveBook}
                        className='bg-black p-2 cursor-pointer text-white w-[600px] rounded-md hover:bg-gray-900'
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CreateBook;
