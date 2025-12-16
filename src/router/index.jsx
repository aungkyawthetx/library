import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import BookForm from '../pages/BookForm.jsx';
import Layout from '../pages/layouts/Layout.jsx';
import BookDetails from '../components/BookDetails.jsx';

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
        ]
    }
]);

export default router;