import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateBook from './pages/books/CreateBook';
import DeleteBook from './pages/books/DeleteBook';
import EditBook from './pages/books/EditBook';
import Library from './pages/books/Library';
import ShowBook from './pages/books/ShowBook';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './pages/auth/PrivateRoute';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route
                path='/library'
                element={
                    <PrivateRoute>
                        <Library />
                    </PrivateRoute>
                }
            ></Route>
            <Route
                path='/books/create'
                element={
                    <PrivateRoute>
                        <CreateBook />
                    </PrivateRoute>
                }
            ></Route>
            <Route
                path='/books/details/:id'
                element={
                    <PrivateRoute>
                        <ShowBook />
                    </PrivateRoute>
                }
            ></Route>
            <Route
                path='/books/edit/:id'
                element={
                    <PrivateRoute>
                        <EditBook />
                    </PrivateRoute>
                }
            ></Route>
            <Route
                path='/books/delete/:id'
                element={
                    <PrivateRoute>
                        <DeleteBook />
                    </PrivateRoute>
                }
            ></Route>
        </Routes>
    );
};
export default App;
