import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Trash from '../assets/trash.svg';
import Pancel from '../assets/edit.svg';


export default function Books() {
    let { isDark } = useTheme();
    let navigate = useNavigate();
    
    const classes = {
        "Romance": "bg-pink-100 text-pink-700",
        "History": "bg-yellow-100 text-yellow-700",
        "Sci-Fi": "bg-indigo-100 text-indigo-700",
        "Fantasy": "bg-green-100 text-green-700",
        "Biography": "bg-blue-100 text-blue-700",
        "Thriller": "bg-red-100 text-red-700",
        "Classic": "bg-fuchsia-200 text-fuchsia-700",
    };

    let [error, setError] = useState('');
    let [books, setBooks] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(function () {
        let ref = collection(db, 'books');
        let q = query(ref, orderBy('date', 'desc'));
        onSnapshot(q, docs => {
            if (docs.empty) {
                setError('Filed to fetch books.');
                setLoading(false);
            }
            else {
                let books = [];

                docs.forEach(doc => {
                    let book = { id: doc.id, ...doc.data() };
                    books.push(book);
                });
                setBooks(books);
                setLoading(false);
                setError('');
            }
        });
    }, []);

    const deleteBook = async (e, id) => {
        e.preventDefault();
        let ref = doc(db, 'books', id);
        await deleteDoc(ref);
        // setBooks(prev => prev.filter(b => b.id !== id));
    }

  return (
    <div>
        {error && <p className='text-red-400 italic'> {error} </p>}
        { loading && <p className='p-2 text-indigo-500 font-semibold'>Loading...</p> }
        {!!books && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
                {books.map((book) => (
                <Link to={`/books/${book.id}`} className={`p-4 border border-gray-200 rounded shadow ${isDark ? 'bg-zinc-900 border-indigo-400' : ''}`} key={book.id}>
                        <img src={book.cover} alt="" className={`h-80 w-full border border-gray-200 rounded-lg ${isDark && 'border-none'}`} />
                    <div className="text-start space-y-1 mt-3">
                        <h1 className={`${isDark ? 'text-indigo-300' : ''} font-semibold uppercase`}> {book.title} </h1>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} description`}> {book.description} </p>
                        <div className="flex justify-between flex-wrap space-y-1 items-center">
                           <div>
                                {book.categories.map((genre) => (
                                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes[genre] || 'bg-gray-200 text-gray-700'}`} key={genre}>
                                        {genre}
                                    </span>
                                ))}
                           </div>
                            <div className='flex space-x-2 items-center'>
                                <button onClick={() => navigate(`books/edit/${book.id}`)} className='cursor-pointer'>
                                    <img src={Pancel} alt="pancel icon"/>
                                </button>
                                <img onClick={(e) => deleteBook(e, book.id)} src={Trash} alt="trash icon"/>
                            </div>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        )}
    </div>
  )
}
