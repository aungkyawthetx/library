import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import Register from '../pages/Register.jsx';
import BookForm from '../pages/BookForm.jsx';
import Layout from '../pages/layouts/Layout.jsx';
import BookDetails from '../components/BookDetails.jsx';
import Login from '../pages/Login.jsx';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Index() {
    let { authReady, user } = useContext(AuthContext);

    const isAuthenticated = Boolean(user);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: isAuthenticated ? <Home/> : <Navigate to='/login'/>
                },
                {
                    path: '/create',
                    element: isAuthenticated ? <BookForm/> : <Navigate to='/login'/>
                },
                {
                    path: '/edit/:id',
                    element: isAuthenticated ? <BookForm/> : <Navigate to='/login'/>
                },
                {
                    path: '/books/:id',
                    element: isAuthenticated ? <BookDetails/> : <Navigate to='/login'/>
                },
                {
                    path: '/register',
                    element: !isAuthenticated ? <Register/> : <Navigate to='/'/>
                },
                {
                    path: '/login',
                    element: !isAuthenticated ? <Login/> : <Navigate to='/'/>
                },
            ]
        }
    ]);
    
    return (        
        authReady && <RouterProvider router={router}/>
    )
}
