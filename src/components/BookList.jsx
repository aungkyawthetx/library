import { Link } from 'react-router-dom';
import Trash from '../assets/trash.svg';
import Pancel from '../assets/edit.svg';
import useFirestore from '../hooks/useFirestore';
import { useCollection } from '../hooks/useCollection';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Books() {
    const classes = {
        "Romance": "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
        "History": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        "Sci-Fi": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
        "Fantasy": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        "Biography": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        "Thriller": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        "Classic": "bg-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300",
    };

    let { deleteDocument } = useFirestore();
    
    let { user } = useContext(AuthContext);
    let { error, loading, data: books } = useCollection('books', ['uid', '==', user.uid]);

    const deleteBook = async (e, id) => {
        e.preventDefault();
        await deleteDocument('books', id);
    }

  return (
    <div>
        {error && <p className='text-red-400 italic'> {error} </p>}
        { loading && <p className='p-2 text-indigo-500 font-semibold'>Loading...</p> }
        {!!books && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
                {books.map((book) => (
                <Link to={`/books/${book.id}`} className="p-4 border border-gray-200 rounded shadow bg-white dark:bg-zinc-800 dark:border-indigo-400" key={book.id}>
                        <img src={book.cover ? book.cover : 'https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg'} alt="" className="h-80 w-full border border-gray-200 rounded-lg dark:border-none" />
                    <div className="text-start space-y-1 mt-3">
                        <h1 className="font-semibold uppercase text-gray-800 dark:text-indigo-300"> {book.title} </h1>
                        <p className="text-gray-600 dark:text-gray-300 description"> {book.description} </p>
                        <div className="flex justify-between flex-wrap space-y-1 items-center">
                           <div>
                                {book.categories.map((genre) => (
                                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes[genre] || 'bg-gray-200 text-indigo-700 dark:bg-gray-700 dark:text-indigo-300'}`} key={genre}>
                                        {genre}
                                    </span>
                                ))}
                           </div>
                            <div className='flex space-x-2 items-center'>
                                <Link to={`books/edit/${book.id}`} className='cursor-pointer' type='button'>
                                    <img src={Pancel} alt="pancel icon"/>
                                </Link>
                                <img onClick={(e) => deleteBook(e, book.id)} src={Trash} alt="trash icon"/>
                            </div>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        )}
        {!books?.length && !loading && <p className='text-red-500 italic font-semibold'>No book found! Try creating one.</p>}
    </div>
  )
}
