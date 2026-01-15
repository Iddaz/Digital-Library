import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import Library from './pages/Library';
import ShowBook from './pages/ShowBook';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/library' element={<Library />}></Route>
            <Route path='/books/create' element={<CreateBook />}></Route>
            <Route path='/books/details/:id' element={<ShowBook />}></Route>
            <Route path='/books/edit/:id' element={<EditBook />}></Route>
            <Route path='/books/delete/:id' element={<DeleteBook />}></Route>
        </Routes>
    );
};
export default App;
