import React, { useState } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [name, setName] = useState('');
    const [taken, setTaken] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveBook = () => {
        const data = { name, taken };
        setLoading(true);
        axios
            .post('http://localhost:8888/books', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
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
                    value={taken}
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
