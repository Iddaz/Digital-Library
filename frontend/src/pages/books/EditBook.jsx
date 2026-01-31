import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton.jsx';
import Spinner from '../../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    // State variables to store book details
    const [name, setName] = useState('');
    const [taken, setTaken] = useState(false);

    // Variable which will show a loading spinner when true
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        // Sending a request to the backend server to get the book's details
        axios
            .get(`http://localhost:8888/books/${id}`)
            .then((response) => {
                setName(response.data.name);
                setTaken(response.data.taken);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [id]);

    // Function to edit the book's details
    const handleEditBook = () => {
        const data = { name, taken };
        setLoading(true);

        // Sending a request to the backend server to update the book's details
        axios
            .put(`http://localhost:8888/books/${id}`, data)
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
        <div className='p-4'>
            <BackButton destination='/library'/>
            <h1 className='text-3xl my-4'>Edit Book</h1>
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
                        setTaken(e.target.checked);
                    }}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <button onClick={handleEditBook} className='bg-sky-300 p-2'>
                Save Book
            </button>
        </div>
    );
};
export default EditBook;
