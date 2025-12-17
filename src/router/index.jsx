import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home/>
                },
                {
                    path: '/create',
                    element: <BookForm/>
                },
                {
                    path: '/edit/:id',
                    element: <BookForm/>
                },
                {
                    path: '/search',
                    element: <Search/>
                },
                {
                    path: '/books/:id',
                    element: <BookDetails/>
                },
                {
                    path: '/register',
                    element: <Register/>
                },
                {
                    path: '/login',
                    element: <Login/>
                },
            ]
        }
    ]);

    let { authReady } = useContext(AuthContext);
    
    return (
        
        authReady && <RouterProvider router={router}/>
    )
}
