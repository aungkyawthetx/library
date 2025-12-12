import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import Create from '../pages/Create.jsx';
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
                element: <Create/>
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