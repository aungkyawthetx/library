import useFetch from '../hooks/useFetch.js';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';


export default function Books() {

    let {isDark} = useTheme();
    let { data : books, loading, error } = useFetch('http://localhost:3001/books');

    const classes = {
        "Romance": "bg-pink-100 text-pink-700",
        "History": "bg-yellow-100 text-yellow-700",
        "Sci-Fi": "bg-indigo-100 text-indigo-700",
        "Fantasy": "bg-green-100 text-green-700",
        "Biography": "bg-blue-100 text-blue-700",
        "Thriller": "bg-red-100 text-red-700",
        "Classic": "bg-fuchsia-200 text-fuchsia-700",
    };
    
    // errors state
    if (error) {
        return <p> {error} </p>
    }

  return (
    <div>
        { loading && <p className='p-2 text-indigo-500 font-semibold'>Loading...</p> }
        {!!books && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
                {books.map((book) => (
                <Link to={`/books/${book.id}`} className={`p-4 border border-gray-200 rounded shadow ${isDark ? 'bg-zinc-900 border-indigo-400' : ''}`} key={book.id}>
                    <img src={book.cover} alt="" className="h-80 w-full border border-gray-200 rounded-lg"/>
                    <div className="text-start space-y-1 mt-3">
                        <h1 className={`${isDark ? 'text-indigo-300' : ''} font-semibold uppercase`}> {book.title} </h1>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} description`}> {book.description} </p>
                        <div className="flex flex-wrap space-y-1">
                            {book.categories.map((genre) => (
                                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes[genre] || 'bg-gray-200 text-gray-700'}`} key={genre}>
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        )}
    </div>
  )
}
